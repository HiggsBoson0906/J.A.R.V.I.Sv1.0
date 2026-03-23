const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dns = require('dns');

// Force IPv4 as a mitigation step against Render's IPv6 YouTube blocking
dns.setDefaultResultOrder('ipv4first');
const { initDB, closeDB } = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const { scheduleAutoBackup } = require('./utils/backup');
require('dotenv').config();

const app = express();

// Security and Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use(logger);

// Core API mapping
app.use('/api', apiRoutes);

// Health Check for PaaS (Render, Fly.io, etc)
app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime(),
        db: "connected" // initDB blocks startup, so if we reach here we are connected.
    });
});

// Root ping
app.get('/', (req, res) => res.json({ success: true, message: "J.A.R.V.I.S. API Engine Live (Production Grade)" }));

// Global Error Handler must be mounted after routes
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
let serverInstance;

// Synchronously initialize the DB before opening TCP ports
initDB().then(() => {
    console.log("[SERVER] Database connected & synced successfully!");
    
    // Start automated DB backups if not running in local debug
    if(process.env.NODE_ENV !== 'development') {
        scheduleAutoBackup();
    }

    serverInstance = app.listen(PORT, () => {
        console.log(`[SERVER] Running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("[SERVER] FATAL: Failed to initialize database:", err);
    process.exit(1); // Fail fast
});

// Graceful Shutdown Implementation
const gracefulShutdown = async (signal) => {
    console.log(`\n[SERVER] Received ${signal}, initiating graceful shutdown...`);
    if (serverInstance) {
        serverInstance.close(async () => {
            console.log("[SERVER] HTTP traffic halted.");
            await closeDB();
            process.exit(0);
        });
        
        // Failsafe exit if hanging
        setTimeout(() => {
            console.error("[SERVER] Failsafe: Forcing shutdown after 10s timeout.");
            process.exit(1);
        }, 10000);
    } else {
        process.exit(0);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
