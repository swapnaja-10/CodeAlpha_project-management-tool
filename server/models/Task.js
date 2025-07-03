const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  assignee: String, // will be same as assigner at creation
  assigner: String,
  projectId: String,
  status: { type: String, default: "Not Started" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
