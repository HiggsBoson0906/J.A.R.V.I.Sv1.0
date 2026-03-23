const fs = require('fs');
const path = require('path');

function scheduleAutoBackup() {
    const backupInterval = 60 * 60 * 1000; // 1 Hour

    setInterval(() => {
        try {
            const primaryPath = process.env.DB_PATH || path.join(__dirname, '..', 'db', 'jarvis.db');
            if (fs.existsSync(primaryPath)) {
                const backupPath = `${primaryPath}.backup`;
                fs.copyFileSync(primaryPath, backupPath);
                console.log(`[BACKUP] Successfully created database backup at ${new Date().toISOString()}`);
            }
        } catch (err) {
            console.error(`[BACKUP] Failed to execute database backup:`, err);
        }
    }, backupInterval);
}

module.exports = { scheduleAutoBackup };
