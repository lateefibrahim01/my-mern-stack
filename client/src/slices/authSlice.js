import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Replace 'YOUR_BACKEND_API_BASE_URL' with the actual backend API base URL
const backendApiBaseUrl = 'http://localhost:5000';

// Async thunk to perform Google OAuth2 login and fetch user data
export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (idToken) => {
  try {
    const response = await axios.post(`${backendApiBaseUrl}/auth/login`, { idToken });
    return response.data.token;
  } catch (error) {
    throw error.response.data.error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to authenticate';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
