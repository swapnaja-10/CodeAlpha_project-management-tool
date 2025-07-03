// ✅ FINAL: routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");

// Create project
router.post("/create", async (req, res) => {
  const { title, userId, dueDate } = req.body;
  try {
    const newProject = new Project({ title, userId, members: [], dueDate });
    await newProject.save();
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
});

// Get projects by userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// View specific project
router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return res.status(404).send({ message: "Not found" });
  res.json(project);
});

// Add member route with user validation
router.post("/add-member", async (req, res) => {
  const { projectId, email } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).send({ message: "Project not found" });

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "User not registered" });
  }

  if (!project.members.includes(email)) {
    project.members.push(email);
    await project.save();
  }

  res.json({ message: "Member added", project });
});

// Remove member from project
router.post("/remove-member", async (req, res) => {
  const { projectId, email } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.members = project.members.filter(e => e !== email);
    await project.save();
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing member" });
  }
});

// Get all registered user emails (for frontend suggestions)
router.get("/registered-users/emails", async (req, res) => {
  try {
    const users = await User.find({}, "email");
    res.json(users.map(u => u.email));
  } catch {
    res.status(500).json({ message: "Error loading users" });
  }
});


module.exports = router;
