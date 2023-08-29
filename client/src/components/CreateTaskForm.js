import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../slices/taskSlice';

const CreateTaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch createTask action to create a new task
    dispatch(createTask({ title, description }));
    // Clear form fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <form className="p-4 bg-white shadow-md rounded-md w-96" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mt-3 px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-indigo-600"
        rows={4}
      />
      <button
        type="submit"
        className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-indigo-700"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
