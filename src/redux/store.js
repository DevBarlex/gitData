// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const githubUserSlice = createSlice({
  name: 'githubUser',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = githubUserSlice.actions;
export const store = configureStore({
  reducer: { githubUser: githubUserSlice.reducer },
});