import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  isSidebarOpen: false, // Assuming the sidebar is initially closed
};

// Create the slice
const toggleSidebarSlice = createSlice({
  name: 'toggleSidebar',
  initialState,
  reducers: {
    // Action to toggle the sidebar open/close
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    // Optionally, you can add actions for manually opening or closing the sidebar
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

// Export the actions
export const { toggleSidebar, openSidebar, closeSidebar } = toggleSidebarSlice.actions;

// Export the reducer
export default toggleSidebarSlice.reducer;
