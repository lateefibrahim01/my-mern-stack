import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Replace 'YOUR_BACKEND_API_BASE_URL' with the actual backend API base URL
const backendApiBaseUrl = 'http://localhost:5000';

// Async thunk to fetch all tasks for the authenticated user
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
  const { auth } = getState(); // Get the authentication state from the Redux store
  const config = {
    headers: {
      Authorization: auth.user, // Include the JWT token in the request headers
    },
  };

  try {
    const response = await axios.get(`${backendApiBaseUrl}/tasks`, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

// Async thunk to create a new task
export const createTask = createAsyncThunk('tasks/createTask', async (newTaskData, { getState }) => {
  const { auth } = getState(); // Get the authentication state from the Redux store
  const config = {
    headers: {
      Authorization: auth.user, // Include the JWT token in the request headers
    },
  };

  try {
    const response = await axios.post(`${backendApiBaseUrl}/tasks/create`, newTaskData, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

// Async thunk to update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, updatedTaskData }, { getState }) => {
  const { auth } = getState(); // Get the authentication state from the Redux store
  const config = {
    headers: {
      Authorization: auth.user, // Include the JWT token in the request headers
    },
  };

  try {
    const response = await axios.put(`${backendApiBaseUrl}/tasks/${taskId}`, updatedTaskData, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { getState }) => {
  const { auth } = getState(); // Get the authentication state from the Redux store
  const config = {
    headers: {
      Authorization: auth.user, // Include the JWT token in the request headers
    },
  };

  try {
    const response = await axios.delete(`${backendApiBaseUrl}/tasks/${taskId}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add the newly created task to the tasks array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create the task';
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTaskIndex = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload; // Update the task in the tasks array
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update the task';
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload._id); // Remove the deleted task from the tasks array
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete the task';
      });
  },
});

export default taskSlice.reducer;
