const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Create course (only expert)
router.post('/', async (req, res) => {
  const { title, content, author, role } = req.body;

  if (role !== 'expert') return res.status(403).json({ error: "Only experts can post courses." });
  if (!title || !content || !author) return res.status(400).json({ error: "All fields are required." });

  try {
    const course = new Course({ title, content, author });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post course." });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses." });
  }
});

module.exports = router;
