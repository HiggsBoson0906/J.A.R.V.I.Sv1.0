const { getPrimaryDB: getDB } = require('../db/connection');
const { sendJSON, sendError } = require('../utils/helpers');

exports.recordSession = async (req, res) => {
    try {
        const { topic, duration, subject_name } = req.body;
        if (!topic || !duration) {
            return sendError(res, "Topic and duration are required inputs.");
        }
        const userId = req.headers['x-user-id'];
        if (!userId) return sendError(res, "Missing core user auth header", 401);
        
        const db = await getDB();
        await db.run('INSERT INTO study_sessions (user_id, subject_name, topic, duration) VALUES (?, ?, ?, ?)', [userId, subject_name || 'Focus Session', topic, duration]);
        
        // Update performance table to register this module as actively studied today
        await db.run('UPDATE performance SET last_studied = CURRENT_TIMESTAMP WHERE user_id = ? AND topic_name = ?', [userId, topic]);
        
        sendJSON(res, { message: "Session recorded" });
    } catch(e) {
        sendError(res, e.message, 500);
    }
};
