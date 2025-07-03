const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ✅ Create Task — Auto-assign to self
router.post("/create", async (req, res) => {
  const { title, dueDate, assigner, projectId } = req.body;

  if (!assigner) {
    return res.status(400).json({ message: "Missing assigner email" });
  }

  try {
    const task = new Task({
      title,
      dueDate,
      assigner,
      assignee: assigner, // self-assign
      projectId,
      status: "Not Started"
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
});

// ✅ Get tasks for a project
router.get("/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
});

// ✅ Get tasks assigned to specific user
router.get("/assigned/:email", async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.params.email });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assigned tasks", error: err });
  }
});

// ✅ Update status
router.post("/update-status", async (req, res) => {
  const { taskId, status } = req.body;
  try {
    await Task.findByIdAndUpdate(taskId, { status: status });
    res.send({ message: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update status" });
  }
});


module.exports = router;
