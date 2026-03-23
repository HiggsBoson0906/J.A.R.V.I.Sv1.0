const { getDB } = require('../db/database');
const { getStatus, sendJSON, sendError } = require('../utils/helpers');

let currentSyncedPlan = null;

exports.syncPlan = (req, res) => {
    currentSyncedPlan = req.body.plan;
    return sendJSON(res, { success: true });
};

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return sendJSON(res, { user_name: "", today_plan: [], weak_topics: [] });

        const db = await getDB();
        const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
        if (!user) {
            return sendJSON(res, { user_name: "", today_plan: [], weak_topics: [] });
        }
        
        const perfs = await db.all('SELECT * FROM performance WHERE user_id = ?', [user.id]);
        
        const todayStr = new Date().toISOString().split('T')[0];

        const weak_topics = perfs.filter(p => {
            if (p.last_studied && p.last_studied.startsWith(todayStr)) return false;
            return getStatus(p.accuracy) === 'Weak';
        }).map(p => ({
            topic_name: p.topic_name,
            accuracy: p.accuracy,
            status: 'Weak'
        }));

        let today_plan = weak_topics.slice(0, 3).map(t => t.topic_name);
        
        if (currentSyncedPlan && currentSyncedPlan.length > 0) {
            today_plan = currentSyncedPlan.map(t => `${t.time.split(' - ')[0]} | ${t.task}`);
        }

        sendJSON(res, {
            user_name: user.name,
            today_plan: today_plan,
            weak_topics: weak_topics
        });
    } catch (e) {
        sendError(res, e.message, 500);
    }
};

exports.getPerformance = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return sendJSON(res, { metrics: { accuracy: 0, time_management: 0, revision: 0, coverage: 0 }, focus_hours: [] });

        const db = await getDB();
        const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
        if (!user) {
            return sendJSON(res, { metrics: { accuracy: 0, retention: 0, streak: 0 }, focus_hours: [] });
        }

        const stats = await db.get('SELECT AVG(accuracy) as avg_acc FROM performance WHERE user_id = ?', [user.id]);
        const userStats = await db.get('SELECT retention_rate, streak FROM user_metrics WHERE user_id = ?', [user.id]) || { retention_rate: 68, streak: 1 };
        const sessions = await db.all(`
            SELECT strftime('%w', timestamp) as dow, SUM(duration) as total_min 
            FROM study_sessions 
            WHERE user_id = ? 
            GROUP BY dow
        `, [user.id]);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const focus_hours = sessions.map(s => ({
            day: days[s.dow] || "Unknown",
            hours: parseFloat((s.total_min / 60).toFixed(1))
        }));

        sendJSON(res, {
            metrics: {
                accuracy: Math.round(stats.avg_acc || 0),
                retention: userStats.retention_rate,
                streak: userStats.streak
            },
            focus_hours
        });
    } catch (e) {
        sendError(res, e.message, 500);
    }
};
