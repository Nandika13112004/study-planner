const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  name: { type: String, required: true },
  difficulty: { type: Number, min: 1, max: 5, required: true },
  examDate: { type: Date, required: true },
  totalChapters: { type: Number, default: 1 },
  estimatedHours: { type: Number, required: true },
  color: { type: String, default: "#6366f1" }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);