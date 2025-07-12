import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../utils/apiservices'; 

const ALL_USER_URL = '/api/v1/users-list';

// Load initial state from local storage
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Save state to local storage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Fetch all users
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (_, { getState }) => {
  const { etag: cachedETag, users: cachedUsers } = getState().users;
  const serverETag = (await apiService.head(ALL_USER_URL)).headers['userlist-etag'];

  if (serverETag && serverETag === cachedETag) {
    return { etag: cachedETag, users: cachedUsers }; // Return cached data
  }

  const users = await apiService.get(ALL_USER_URL).then((res) => res.data);
  saveToLocalStorage('ALL_USERS', { etag: serverETag, users });
  return { etag: serverETag, users };
});

// Delete user
export const deleteUserById = createAsyncThunk('users/deleteUser', async (id, { dispatch }) => {
  await apiService.delete(`${ALL_USER_URL}/${id}`);
  dispatch(fetchAllUsers()); // Refresh the user list
});

const usersSlice = createSlice({
  name: 'users',
  initialState: loadFromLocalStorage('ALL_USERS') || { etag: null, users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.etag = action.payload.etag;
        state.users = action.payload.users;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        // Users will be refreshed via fetchAllUsers
      });
  },
});

export const usersReducer = usersSlice.reducer;
