import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../slices/taskSlice';
import EditTaskForm from './EditTaskForm';

const TasksPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks when the component mounts
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = (taskData) => {
    // Dispatch createTask action to create a new task
    dispatch(createTask(taskData));
  };

  const handleEditTask = (task) => {
    // Display the EditTaskForm and pass the selected task data
    setShowEditForm(true);
    setSelectedTask(task);
  };

  const handleUpdateTask = (taskId, updatedTaskData) => {
    // Dispatch updateTask action to update the task
    dispatch(updateTask({ taskId, updatedTaskData }));
    // Close the EditTaskForm after updating the task
    setShowEditForm(false);
  };

  const handleDeleteTask = (taskId) => {
    // Dispatch deleteTask action to delete the task
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-8">Tasks Page</h1>
      {loading ? (
        <p className="text-lg">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="mb-4 p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="mt-2">{task.description}</p>
            <div className="mt-4">
              <button
                onClick={() => handleEditTask(task)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Create New Task</h2>
      <CreateTaskForm onCreateTask={handleCreateTask} />
      {showEditForm && selectedTask && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
          <EditTaskForm
            task={selectedTask}
            onUpdateTask={(taskId, updatedTaskData) => handleUpdateTask(taskId, updatedTaskData)}
          />
        </div>
      )}
    </div>
  );
};

export default TasksPage;
