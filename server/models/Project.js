// ✅ FINAL: models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  userId: String,
  members: [String],
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
