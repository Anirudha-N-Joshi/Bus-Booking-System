import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// SIGNUP
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, phone, password, role = 'user' } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        await pool.query(
            'INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6)',
            [firstName, lastName, email, phone, hash, role]
        );
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        // 👇 Log the actual error
        console.error(err);

        if (err.code === '23505') {
            // PostgreSQL unique_violation error
            res.status(409).json({ error: 'Email already registered' });
        } else {
            res.status(500).json({ error: 'Signup failed' });
        }
    }
});


export default router;
