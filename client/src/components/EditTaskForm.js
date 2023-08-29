import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../slices/taskSlice';

const EditTaskForm = ({ task }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch updateTask action to update the task
    dispatch(updateTask({ taskId: task._id, updatedTaskData: { title, description } }));
  };

  return (
    <form className="p-4 bg-white shadow-md rounded-md w-96" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mt-3 px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-indigo-600"
        rows={4}
      />
      <button
        type="submit"
        className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-indigo-700"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTaskForm;
