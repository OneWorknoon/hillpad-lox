import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchExecutive = createAsyncThunk('executive/fetchExecutive', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/course/list?name=executive`);
  const data = details.data.results;
  const count = details.data.count;
  const result = { data, count };
  return result;
});

const executiveSlice = createSlice({
  name: 'executive',
  initialState: {
    executiveList: [],
    pending: false,
    error: false
  },
  reducers: {
    updateExecutive: (state, action) => {
      state.executiveList = action.payload;
    }
  },
  extraReducers: {
    [fetchExecutive.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchExecutive.fulfilled]: (state, action) => {
      state.executiveList = action.payload.data;
      state.count = action.payload.count;
      state.pending = false;
    },
    [fetchExecutive.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updateExecutive } = executiveSlice.actions;

export default executiveSlice.reducer;