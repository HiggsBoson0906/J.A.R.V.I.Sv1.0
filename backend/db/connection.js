const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

let primaryDBPromise = null;
let secondaryDBPromise = null;

// Ensure production folder exists if we are running locally or simulating
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};

async function getPrimaryDB() {
    if (!primaryDBPromise) {
        // Fallback resolution for Render vs Local
        const primaryPath = process.env.DB_PATH || path.join(__dirname, 'jarvis.db');
        ensureDirectoryExistence(primaryPath);
        
        // Auto-seed the persistent volume on Render if it's empty
        if (process.env.DB_PATH && !fs.existsSync(primaryPath)) {
            const localBackup = path.join(__dirname, 'jarvis.db');
            if (fs.existsSync(localBackup)) {
                console.log(`[DB] Seeding persistent volume from local repository fallback...`);
                fs.copyFileSync(localBackup, primaryPath);
            }
        }
        
        primaryDBPromise = open({
            filename: primaryPath,
            driver: sqlite3.Database
        }).then(async db => {
            // Activate High-Concurrency WAL Mode (Write-Ahead-Logging)
            await db.exec('PRAGMA journal_mode = WAL;');
            await db.exec('PRAGMA synchronous = NORMAL;');
            await db.exec('PRAGMA busy_timeout = 5000;');
            console.log(`[DB] Connected to primary database at ${primaryPath}`);
            return db;
        }).catch(err => {
            console.error('[DB] Failed to connect to primary database:', err);
            throw err; // Fail fast on DB failure
        });
    }
    return primaryDBPromise;
}

async function getSecondaryDB() {
    if (!secondaryDBPromise) {
        const secondaryPath = process.env.DB_PATH_2 || path.join(__dirname, 'second.db');
        ensureDirectoryExistence(secondaryPath);
        
        // Auto-seed the persistent volume on Render if it's empty
        if (process.env.DB_PATH_2 && !fs.existsSync(secondaryPath)) {
            const localBackup = path.join(__dirname, 'second.db');
            if (fs.existsSync(localBackup)) {
                console.log(`[DB] Seeding persistent volume from secondary local fallback...`);
                fs.copyFileSync(localBackup, secondaryPath);
            }
        }
        
        secondaryDBPromise = open({
            filename: secondaryPath,
            driver: sqlite3.Database
        }).then(async db => {
            await db.exec('PRAGMA journal_mode = WAL;');
            await db.exec('PRAGMA synchronous = NORMAL;');
            await db.exec('PRAGMA busy_timeout = 5000;');
            console.log(`[DB] Connected to secondary database at ${secondaryPath}`);
            return db;
        }).catch(err => {
            console.error('[DB] Failed to connect to secondary database:', err);
            throw err;
        });
    }
    return secondaryDBPromise;
}

// Safely configure core schemas
async function initDB() {
    const db = await getPrimaryDB();
    await getSecondaryDB(); // Initialize the secondary DB to ensure it mounts properly
    
    // Core JARVIS schema definition
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            password TEXT,
            course TEXT,
            exam_year TEXT
        );
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
        CREATE TABLE IF NOT EXISTS user_metrics (
            user_id INTEGER PRIMARY KEY,
            retention_rate INTEGER DEFAULT 68,
            streak INTEGER DEFAULT 1,
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
    
    // Attempt non-destructive column migrations
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
        } catch (err) {}
    }
}

async function closeDB() {
    console.log("[DB] Commencing graceful database shutdown...");
    try {
        if (primaryDBPromise) {
            const primaryDB = await primaryDBPromise;
            await primaryDB.close();
            console.log("[DB] Primary database closed safely.");
        }
        if (secondaryDBPromise) {
            const secondaryDB = await secondaryDBPromise;
            await secondaryDB.close();
            console.log("[DB] Secondary database closed safely.");
        }
    } catch (err) {
        console.error("[DB] Error closing databases:", err);
    }
}

module.exports = { getPrimaryDB, getSecondaryDB, initDB, closeDB };
