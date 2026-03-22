const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => res.json({ success: true, message: "J.A.R.V.I.S. API Engine Live" }));

const PORT = process.env.PORT || 3001;

initDB().then(() => {
    console.log("Database connected & synced successfully!");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to initialize database:", err);
});
