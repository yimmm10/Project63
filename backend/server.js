require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');// อ้างอิงไฟล์ auth.js ใน routes
const projectRoutes = require('./routes/project'); // อ้างอิงไฟล์ project.js ใน routes

const app = express();
const PORT = process.env.PORT || 5000;

// เสิร์ฟไฟล์ Static
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes); // เพิ่ม Route สำหรับโปรเจค

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB(successfully)'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
