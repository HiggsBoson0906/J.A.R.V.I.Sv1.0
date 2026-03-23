const { getPrimaryDB: getDB } = require('../db/connection');

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, course, exam_year } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const db = await getDB();
        
        // Simple plain text for mock purposes, hash in production
        try {
            const result = await db.run(
                'INSERT INTO users (name, email, password, course, exam_year) VALUES (?, ?, ?, ?, ?)',
                [name, email, password, course || null, exam_year || null]
            );
            
            await db.run('INSERT INTO user_metrics (user_id, retention_rate, streak) VALUES (?, 68, 1)', [result.lastID]);
            
            res.status(201).json({ 
                success: true, 
                message: "User created securely.",
                data: {
                    userId: result.lastID,
                    name: name,
                    email: email,
                    course: course,
                    exam_year: exam_year
                }
            });
        } catch (e) {
            if (e.message.includes('UNIQUE constraint failed') || e.message.includes('idx_users_email')) {
                return res.status(409).json({ success: false, message: "User with this email already exists."});
            }
            throw e;
        }

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const db = await getDB();
        const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

        if (user) {
            res.json({
                success: true,
                message: "Login successful.",
                data: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    course: user.course,
                    exam_year: user.exam_year
                }
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials." });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error during login." });
    }
};
