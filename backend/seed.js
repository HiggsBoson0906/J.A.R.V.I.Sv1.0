const { initDB, getDB } = require('./db/database');

async function seedData() {
    const db = await getDB();
    
    console.log("Wiping original schemas...");
    // Clear tables for idempotency BEFORE initializing schemas
    await db.exec('DROP TABLE IF EXISTS performance; DROP TABLE IF EXISTS study_sessions; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS syllabus;');

    await initDB();
    
    console.log("Seeding fresh demo datastructures...");

    // Create Target User
    await db.run('INSERT INTO users (name) VALUES (?)', ['Alex Chen']);
    const user = await db.get('SELECT id FROM users ORDER BY id DESC LIMIT 1');
    const userId = user.id;

    // Hydrate Performance Data mimicking historical use
    const perfData = [
        { subject: 'Physics', topic: 'Thermodynamics', acc: 42, attempts: 50, correct: 21 },
        { subject: 'Chemistry', topic: 'Organic Synthesis', acc: 48, attempts: 100, correct: 48 },
        { subject: 'Physics', topic: 'Rotational Mechanics', acc: 35, attempts: 60, correct: 21 },
        { subject: 'Physics', topic: 'Fluid Dynamics', acc: 45, attempts: 40, correct: 18 },
        { subject: 'Mathematics', topic: 'Complex Numbers', acc: 38, attempts: 50, correct: 19 },
        { subject: 'Physics', topic: 'Electromagnetism', acc: 65, attempts: 60, correct: 39 },
        { subject: 'Chemistry', topic: 'Chemical Kinetics', acc: 55, attempts: 80, correct: 44 },
        { subject: 'Chemistry', topic: 'Atomic Structure', acc: 72, attempts: 50, correct: 36 },
        { subject: 'Mathematics', topic: 'Differential Equations', acc: 68, attempts: 100, correct: 68 },
        { subject: 'Mathematics', topic: 'Coordinate Geometry', acc: 60, attempts: 70, correct: 42 },
        { subject: 'Mathematics', topic: 'Calculus Integration', acc: 88, attempts: 40, correct: 35 },
        { subject: 'Mathematics', topic: 'Matrices & Determinants', acc: 92, attempts: 50, correct: 46 },
        { subject: 'Chemistry', topic: 'Mole Concept', acc: 85, attempts: 60, correct: 51 },
        { subject: 'Physics', topic: 'Kinematics', acc: 95, attempts: 40, correct: 38 },
        { subject: 'Chemistry', topic: 'Periodic Table', acc: 82, attempts: 50, correct: 41 }
    ];

    for (const p of perfData) {
        await db.run(`INSERT INTO performance (user_id, subject_name, topic_name, accuracy, questions_attempted, correct_answers) 
                      VALUES (?, ?, ?, ?, ?, ?)`, 
                      [userId, p.subject, p.topic, p.acc, p.attempts, p.correct]);
    }

    // Hydrate Syllabus
    const syllabusData = [
        { subject: 'Physics', topics: ['Thermodynamics', 'Kinematics', 'Electromagnetism', 'Fluid Dynamics', 'Rotational Mechanics', 'Optics', 'Modern Physics', 'Gravitation', 'Work Energy Power'] },
        { subject: 'Chemistry', topics: ['Organic Synthesis', 'Chemical Kinetics', 'Atomic Structure', 'Mole Concept', 'Periodic Table', 'Thermodynamics (Chem)', 'Equilibrium', 'Chemical Bonding', 'Redox Reactions'] },
        { subject: 'Mathematics', topics: ['Complex Numbers', 'Differential Equations', 'Coordinate Geometry', 'Calculus Integration', 'Matrices & Determinants', 'Probability', 'Vectors', 'Sequence and Series', 'Binomial Theorem'] }
    ];

    for (const group of syllabusData) {
        for (const topic of group.topics) {
            await db.run('INSERT INTO syllabus (subject_name, topic_name) VALUES (?, ?)', [group.subject, topic]);
        }
    }

    // Hydrate Study Sessions chronologically simulating one week pattern
    const sessions = [
        { subject: 'Physics', topic: 'Thermodynamics', dur: 120, daysAgo: 0 },
        { subject: 'Mathematics', topic: 'Calculus Integration', dur: 90, daysAgo: 1 },
        { subject: 'Chemistry', topic: 'Organic Synthesis', dur: 180, daysAgo: 2 },
        { subject: 'Physics', topic: 'Electromagnetism', dur: 60, daysAgo: 3 }
    ];

    for (const s of sessions) {
        await db.run(`INSERT INTO study_sessions (user_id, subject_name, topic, duration, timestamp) 
                      VALUES (?, ?, ?, ?, datetime('now', '-${s.daysAgo} days'))`, 
                      [userId, s.subject, s.topic, s.dur]);
    }

    console.log("Seed complete! Database jarvis.db is locked and loaded.");
}

seedData().catch(console.error);
