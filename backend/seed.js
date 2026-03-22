const { initDB, getDB } = require('./db/database');

async function seedData() {
    await initDB();
    const db = await getDB();
    
    console.log("Seeding fresh demo datastructures...");
    
    // Clear tables for idempotency
    await db.exec('DELETE FROM users; DELETE FROM performance; DELETE FROM study_sessions;');

    // Create Target User
    await db.run('INSERT INTO users (name) VALUES (?)', ['Alex Chen']);
    const user = await db.get('SELECT id FROM users ORDER BY id DESC LIMIT 1');
    const userId = user.id;

    // Hydrate Performance Data mimicking historical use
    const perfData = [
        { topic: 'Thermodynamics', acc: 42, attempts: 50, correct: 21 },
        { topic: 'Organic Synthesis', acc: 48, attempts: 100, correct: 48 },
        { topic: 'Calculus Integration', acc: 88, attempts: 40, correct: 35 },
        { topic: 'Electromagnetism', acc: 65, attempts: 60, correct: 39 }
    ];

    for (const p of perfData) {
        await db.run(`INSERT INTO performance (user_id, topic_name, accuracy, questions_attempted, correct_answers) 
                      VALUES (?, ?, ?, ?, ?)`, 
                      [userId, p.topic, p.acc, p.attempts, p.correct]);
    }

    // Hydrate Study Sessions chronologically simulating one week pattern
    const sessions = [
        { topic: 'Thermodynamics', dur: 120, daysAgo: 0 },
        { topic: 'Calculus', dur: 90, daysAgo: 1 },
        { topic: 'Organic Chemistry', dur: 180, daysAgo: 2 },
        { topic: 'Electromagnetism', dur: 60, daysAgo: 3 }
    ];

    for (const s of sessions) {
        await db.run(`INSERT INTO study_sessions (user_id, topic, duration, timestamp) 
                      VALUES (?, ?, ?, datetime('now', '-${s.daysAgo} days'))`, 
                      [userId, s.topic, s.dur]);
    }

    console.log("Seed complete! Database jarvis.db is locked and loaded.");
}

seedData().catch(console.error);
