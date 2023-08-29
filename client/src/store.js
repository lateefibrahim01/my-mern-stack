import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import taskReducer from './store/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    // Add other reducers if needed
  },
});

export default store;
