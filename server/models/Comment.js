// ✅ OK: models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  projectId: String,
  user: String, // user email or name
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
