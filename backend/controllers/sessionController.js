const { getDB } = require('../db/database');
const { sendJSON, sendError } = require('../utils/helpers');

exports.recordSession = async (req, res) => {
    try {
        const { topic, duration } = req.body;
        if (!topic || !duration) {
            return sendError(res, "Topic and duration are required inputs.");
        }
        
        const db = await getDB();
        const user = await db.get('SELECT id FROM users LIMIT 1');
        
        if (user) {
            await db.run('INSERT INTO study_sessions (user_id, topic, duration) VALUES (?, ?, ?)', [user.id, topic, duration]);
        }
        
        sendJSON(res, { message: "Session recorded" });
    } catch(e) {
        sendError(res, e.message, 500);
    }
};
