const { getDB } = require('../db/database');
const { getStatus, sendJSON, sendError } = require('../utils/helpers');

const datasets = {
    "Thermodynamics": { video_link: "https://youtube.com/watch?v=thermo", book_ref: "Chapter 4, Physics Vol 1", practice: "JEE Mains PYQs 2020-2023" },
    "Calculus": { video_link: "https://youtube.com/watch?v=calc", book_ref: "Calculus by Thomas", practice: "NCERT Exercise 7" },
    "Organic Chemistry": { video_link: "https://youtube.com/watch?v=ochem", book_ref: "Solomons & Fryhle", practice: "MS Chouhan Exercises" }
};

exports.getTopic = async (req, res) => {
    try {
        const topic = req.params.name;
        const db = await getDB();
        const perf = await db.get('SELECT * FROM performance WHERE topic_name LIKE ? LIMIT 1', [`%${topic}%`]);
        
        if (!perf) {
            return sendJSON(res, { topic_name: topic, accuracy: 0, status: getStatus(0) });
        }
        sendJSON(res, {
            topic_name: perf.topic_name,
            accuracy: perf.accuracy,
            status: getStatus(perf.accuracy)
        });
    } catch(e) {
        sendError(res, e.message, 500);
    }
};

exports.getResources = async (req, res) => {
    try {
        const topic = req.query.topic || "";
        const data = datasets[topic];
        
        if (!data) {
             return sendJSON(res, { topic, video_link: "", book_ref: "", practice: "", reason: "Topic specific resources unavailable." });
        }
        
        const db = await getDB();
        const perf = await db.get('SELECT accuracy FROM performance WHERE topic_name LIKE ?', [`%${topic}%`]);
        const status = getStatus(perf ? perf.accuracy : 0);
        
        let reason = `Since your performance is ${status} in ${topic}, this material is selectively picked to ${status === 'Weak' ? 'rebuild foundational clarity' : 'challenge your advanced problem solving'}.`;

        sendJSON(res, {
            topic: topic,
            video_link: data.video_link,
            book_ref: data.book_ref,
            practice: data.practice,
            reason: reason
        });
    } catch(e) {
        sendError(res, e.message, 500);
    }
};
