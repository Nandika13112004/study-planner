const express = require("express");
const router = express.Router();
const axios = require("axios");
const { protect } = require("../middleware/authMiddleware");
const Subject = require("../models/Subject");

router.post("/generate", protect, async (req, res) => {
  try {
    const { availableHours, planDays } = req.body;

    // Get user's subjects from database
    const subjects = await Subject.find({ userId: req.user._id });

    if (subjects.length === 0) {
      return res.status(400).json({ message: "No subjects found. Please add subjects first!" });
    }

    // Format subjects for AI service
    const formattedSubjects = subjects.map(s => ({
      name: s.name,
      difficulty: s.difficulty,
      examDate: s.examDate.toISOString().split('T')[0]
    }));

    // Call Python AI service
    const aiResponse = await axios.post('http://localhost:5001/generate-plan', {
      subjects: formattedSubjects,
      availableHours: availableHours || 3,
      planDays: planDays || 7
    });

    res.json(aiResponse.data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;