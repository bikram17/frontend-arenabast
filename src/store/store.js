import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import toggleSidebarReducer from '../features/toggleSidebarSlice';
import { usersReducer } from '../features/userSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, // Add other slices here as needed
    mobileSidebar:toggleSidebarReducer,
    users: usersReducer,

  },
});

export default store;
