import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchUndergraduate = createAsyncThunk('undergraduate/fetchUndergraduate', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/course/list?programme=undergraduate`);
  const data = details.data.results;
  const count = details.data.count;
  const result = { data, count };
  return result;
});

const undergraduateSlice = createSlice({
  name: 'undergraduate',
  initialState: {
    bachelorsList: [],
    pending: false,
    error: false
  },
  reducers: {
    updateUndergraduate: (state, action) => {
      state.undergraduateList = action.payload;
    }
  },
  extraReducers: {
    [fetchUndergraduate.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchUndergraduate.fulfilled]: (state, action) => {
      state.undergraduateList = action.payload.data;
      state.count = action.payload.count;
      state.pending = false;
    },
    [fetchUndergraduate.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updateUndergraduate } = undergraduateSlice.actions;

export default undergraduateSlice.reducer;
