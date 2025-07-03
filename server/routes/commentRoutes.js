// ✅ NEW: routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/create', async (req, res) => {
  const { text, projectId, user } = req.body;
  try {
    const comment = new Comment({ text, projectId, user });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error creating comment", error: err });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const comments = await Comment.find({ projectId: req.params.projectId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err });
  }
});

module.exports = router;