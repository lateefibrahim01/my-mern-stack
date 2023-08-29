const Task = require('../models/Task');

// Controller to create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id; // Extracting the authenticated user's MongoDB _id from the request

    const task = await Task.create({ title, description, user: userId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create the task' });
  }
};

// Controller to get all tasks for the authenticated user
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id; // Extracting the authenticated user's MongoDB _id from the request
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error.message);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};

// Controller to update a task
const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const taskId = req.params.id;
    const userId = req.user._id; // Extracting the authenticated user's MongoDB _id from the request

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description, completed, updatedAt: Date.now() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: 'Failed to update the task' });
  }
};

// Controller to delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id; // Extracting the authenticated user's MongoDB _id from the request

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Failed to delete the task' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
