const { getDB } = require('../db/database');
const { sendJSON, sendError, getStatus } = require('../utils/helpers');

exports.generatePlan = async (req, res) => {
    try {
        const { subjects } = req.body;
        
        if (!subjects || subjects.length === 0) {
             return res.json({ success: true, data: { plan: [] } });
        }

        const userId = req.headers['x-user-id'];
        if (!userId) return res.json({ success: false, message: 'Unauthorized payload' });

        const db = await getDB();
        const plan = [];

        // For each subject, grab exactly 1 revision (lowest accuracy) and 1 new topic (from syllabus not in performance)
        for (const subject of subjects) {
            // 1. Revision Topic (from performance, weak first)
            const revStmt = await db.get(
                'SELECT topic_name, accuracy FROM performance WHERE subject_name = ? AND user_id = ? ORDER BY accuracy ASC LIMIT 1', 
                [subject, userId]
            );

            if (revStmt) {
                plan.push({
                   subject: subject,
                   topic: revStmt.topic_name,
                   type: 'Revision'
                });
            }

            // 2. New Topic (from syllabus, not in performance)
            const newStmt = await db.get(`
                SELECT topic_name FROM syllabus 
                WHERE subject_name = ? 
                AND topic_name NOT IN (SELECT topic_name FROM performance WHERE subject_name = ? AND user_id = ?) 
                LIMIT 1
            `, [subject, subject, userId]);

            if (newStmt) {
                plan.push({
                   subject: subject,
                   topic: newStmt.topic_name,
                   type: 'New Study'
                });
            }
        }

        const structuredPlan = plan.map((p, i) => {
            const typeLabel = p.type === 'Revision' ? 'Revision Focus' : 'Deep Study';
            const desc = p.type === 'Revision' 
                ? 'Review weak concepts and solve advanced practice problems targeting historical bottlenecks.' 
                : 'Cover new theoretical concepts and build foundational problem solving intuition.';

            return {
                time: `90 mins`,
                title: `${p.subject} | ${typeLabel}: ${p.topic}`,
                description: desc
            };
        });

        return res.json({ success: true, data: { plan: structuredPlan } });

    } catch (e) {
        console.error("Generate Plan Error:", e);
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};

exports.suggestGoals = exports.generatePlan;  // Identical logic structure

exports.getPlanner = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return sendJSON(res, { tomorrow_plan: [] });

        const db = await getDB();
        const perfs = await db.all('SELECT topic_name, accuracy FROM performance WHERE user_id = ?', [userId]);
        
        if (!perfs || !perfs.length) {
            return sendJSON(res, { tomorrow_plan: [] });
        }

        const plan = perfs.slice(0, 4).map(p => {
            const stat = getStatus(p.accuracy);
            if (stat === "Weak") return `High Priority Focus: ${p.topic_name}`;
            if (stat === "Moderate") return `Problem Solving Session: ${p.topic_name}`;
            return `Maintenance Review: ${p.topic_name}`;
        });

        sendJSON(res, { tomorrow_plan: plan });
    } catch (e) {
        sendError(res, e.message, 500);
    }
};
