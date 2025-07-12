import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const loadAuthInfo = () => {
  try {
    const savedAuthInfo = localStorage.getItem('adminAuthInfo');
    return savedAuthInfo
      ? JSON.parse(savedAuthInfo)
      : {
          isLoggedIn: false,
          name: '',
          email: '',
          role: '',
        };
  } catch (error) {
    console.warn('Failed to load auth info from localStorage:', error);
    return {
      isLoggedIn: false,
      name: '',
      email: '',
      role: '',
    };
  }
};

const initialState = loadAuthInfo();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const user = action.payload;

      state.isLoggedIn = true;
      state.name = user.name; 
      state.email = user.email;
      state.role = user.role;

      // Save updated auth info to local storage
      localStorage.setItem(
        'adminAuthInfo',
        JSON.stringify({
          isLoggedIn: true,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );
    },

    setLogout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
      state.role = '';

      // Clear auth info
      localStorage.removeItem('adminAuthInfo');
      Cookies.remove('adminToken');
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
