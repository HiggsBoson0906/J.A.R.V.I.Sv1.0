const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let dbPromise = null;

async function getDB() {
    if (!dbPromise) {
        dbPromise = open({
            filename: path.join(__dirname, 'jarvis.db'),
            driver: sqlite3.Database
        });
    }
    return dbPromise;
}

async function initDB() {
    const db = await getDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            password TEXT,
            course TEXT,
            exam_year TEXT
        );
    `);
    
    // Attempt to safely migrate older schemas
    const migrations = [
        'ALTER TABLE users ADD COLUMN email TEXT;',
        'ALTER TABLE users ADD COLUMN password TEXT;',
        'ALTER TABLE users ADD COLUMN course TEXT;',
        'ALTER TABLE users ADD COLUMN exam_year TEXT;',
        'CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);'
    ];
    
    for (let query of migrations) {
        try {
            await db.exec(query);
        } catch (err) {
            // Safe to ignore if column exists
        }
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS performance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            subject_name TEXT NOT NULL,
            topic_name TEXT NOT NULL,
            accuracy INTEGER DEFAULT 0,
            questions_attempted INTEGER DEFAULT 0,
            correct_answers INTEGER DEFAULT 0,
            last_studied DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        CREATE TABLE IF NOT EXISTS syllabus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_name TEXT NOT NULL,
            topic_name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS study_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            subject_name TEXT NOT NULL,
            topic TEXT NOT NULL,
            duration INTEGER DEFAULT 0,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);
}

module.exports = { getDB, initDB };
