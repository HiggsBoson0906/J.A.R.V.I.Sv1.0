const { getPrimaryDB, closeDB } = require('./db/connection');

async function hydrateSyllabus() {
    try {
        const db = await getPrimaryDB();
        
        // Hydrate Syllabus
        const syllabusData = [
            { subject: 'Physics', topics: ['Thermodynamics', 'Kinematics', 'Electromagnetism', 'Fluid Dynamics', 'Rotational Mechanics', 'Optics', 'Modern Physics', 'Gravitation', 'Work Energy Power'] },
            { subject: 'Chemistry', topics: ['Organic Synthesis', 'Chemical Kinetics', 'Atomic Structure', 'Mole Concept', 'Periodic Table', 'Thermodynamics (Chem)', 'Equilibrium', 'Chemical Bonding', 'Redox Reactions'] },
            { subject: 'Mathematics', topics: ['Complex Numbers', 'Differential Equations', 'Coordinate Geometry', 'Calculus Integration', 'Matrices & Determinants', 'Probability', 'Vectors', 'Sequence and Series', 'Binomial Theorem'] }
        ];

        let count = 0;
        for (const group of syllabusData) {
            for (const topic of group.topics) {
                // Check if already exists to prevent duplicates
                const existing = await db.get('SELECT id FROM syllabus WHERE subject_name = ? AND topic_name = ?', [group.subject, topic]);
                if (!existing) {
                    await db.run('INSERT INTO syllabus (subject_name, topic_name) VALUES (?, ?)', [group.subject, topic]);
                    count++;
                }
            }
        }

        console.log(`[SEED] Global syllabus updated. Inserted ${count} new topics safely without wiping existing data.`);
        await closeDB();
    } catch (err) {
        console.error("[SEED] Error:", err);
    }
}

hydrateSyllabus();
