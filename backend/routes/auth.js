const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Middleware
const User = require('../models/User'); // เส้นทางสำหรับโมเดล User
const Project = require('../models/Project'); // เส้นทางสำหรับโมเดล Project


// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user details including projects
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided!' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).populate('projects'); // ดึงข้อมูลโปรเจคร่วมด้วย
        if (!user) return res.status(404).json({ error: 'User not found!' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new project
router.post('/projects/create', authenticate, async (req, res) => {
    try {
        const { projectName, description, startDate, endDate } = req.body;
        const code = Math.random().toString(36).substr(2, 8).toUpperCase();

        const project = new Project({
            projectName,
            description,
            startDate,
            endDate,
            code,
            members: [req.userId],
        });

        await project.save();

        const user = await User.findById(req.userId);
        user.projects.push(project._id);
        await user.save();

        res.status(201).json({ message: 'Project created successfully!', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Join an existing project
router.post('/projects/join', async (req, res) => {
    try {
        const { projectCode, userId } = req.body;
        const project = await Project.findOne({ code: projectCode });
        if (!project) return res.status(404).json({ error: 'Project not found!' });

        if (!project.members.includes(userId)) {
            project.members.push(userId);
            await project.save();
        }

        const user = await User.findById(userId);
        if (!user.projects.includes(project._id)) {
            user.projects.push(project._id);
            await user.save();
        }

        res.status(200).json({ message: 'Successfully joined the project!', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
