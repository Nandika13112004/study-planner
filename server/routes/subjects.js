const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const { protect } = require("../middleware/authMiddleware");

// Get all subjects for logged in user
router.get("/", protect, async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a subject
router.post("/", protect, async (req, res) => {
  try {
    const { name, difficulty, examDate, totalChapters, estimatedHours, color } = req.body;
    const subject = await Subject.create({
      userId: req.user._id,
      name,
      difficulty,
      examDate,
      totalChapters,
      estimatedHours,
      color
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a subject
router.put("/:id", protect, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if (subject.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const updated = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a subject
router.delete("/:id", protect, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if (subject.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;