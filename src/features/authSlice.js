import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Load auth info from localStorage
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
          walletBalance: '00.00',
          id:'',
        };
  } catch (error) {
    console.warn('Failed to load auth info from localStorage:', error);
    return {
      isLoggedIn: false,
      name: '',
      email: '',
      role: '',
      walletBalance: '00.00',
      id:'',
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
      state.id=user.id;
      state.walletBalance = user.walletBalance || '00.00';

      localStorage.setItem(
        'adminAuthInfo',
        JSON.stringify({
          isLoggedIn: true,
          name: user.name,
          email: user.email,
          role: user.role,
          id:user.id,
          walletBalance: user.walletBalance || '00.00',
        })
      );
    },

    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;

      // Update localStorage with the new wallet balance
      const savedAuthInfo = localStorage.getItem('adminAuthInfo');
      if (savedAuthInfo) {
        try {
          const parsedInfo = JSON.parse(savedAuthInfo);
          parsedInfo.walletBalance = action.payload;
          localStorage.setItem('adminAuthInfo', JSON.stringify(parsedInfo));
        } catch (error) {
          console.warn('Failed to update wallet balance in localStorage:', error);
        }
      }
    },

    setLogout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
      state.role = '';
      state.id='';
      state.walletBalance = '00.00';

      localStorage.removeItem('adminAuthInfo');
      Cookies.remove('adminToken');
    },
  },
});

export const { setLogin, setLogout, setWalletBalance } = authSlice.actions;
export default authSlice.reducer;
