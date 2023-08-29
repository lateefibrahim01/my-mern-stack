const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// Apply the authentication middleware to all routes in this router
router.use(authMiddleware);

// Route to create a new task
router.post('/create', taskController.createTask);

// Route to get all tasks for the authenticated user
router.get('/', taskController.getAllTasks);

// Route to update a task
router.put('/:id', taskController.updateTask);

// Route to delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
