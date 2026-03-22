const { getDB } = require('../db/database');
const { sendJSON, sendError, getStatus } = require('../utils/helpers');

exports.generatePlan = async (req, res) => {
    try {
        const { performance_data } = req.body;
        if (!performance_data || !Array.isArray(performance_data) || performance_data.length === 0) {
            return sendJSON(res, { tomorrow_plan: [] });
        }

        const plan = performance_data.map(p => {
            const stat = getStatus(p.accuracy);
            if (stat === "Weak") return `Revision Block: Deep dive into ${p.topic_name}`;
            if (stat === "Moderate") return `Active Practice: Solve 20 questions on ${p.topic_name}`;
            return `Light Review: Quick quiz on ${p.topic_name}`;
        });

        sendJSON(res, { tomorrow_plan: plan });
    } catch (e) {
        sendError(res, e.message, 500);
    }
};

exports.suggestGoals = exports.generatePlan; // Identical logic structure

exports.getPlanner = async (req, res) => {
    try {
        const db = await getDB();
        const perfs = await db.all('SELECT topic_name, accuracy FROM performance');
        
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
