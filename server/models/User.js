const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studyPreferences: {
    dailyHours: { type: Number, default: 3 },
    preferredTime: { type: String, default: "evening" }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);