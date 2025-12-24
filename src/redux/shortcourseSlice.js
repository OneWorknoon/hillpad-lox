import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchShortCourse = createAsyncThunk('shortcourse/fetchShortCourse', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/course/list?programme=short+courses`);
  const data = details.data.results;
  const count = details.data.count;
  const result = { data, count };
  return result;
});

const shortcourseSlice = createSlice({
  name: 'shortcourse',
  initialState: {
    shortcourseList: [],
    pending: false,
    error: false
  },
  reducers: {
    updateShortCourse: (state, action) => {
      state.shortcourseList = action.payload;
    }
  },
  extraReducers: {
    [fetchShortCourse.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchShortCourse.fulfilled]: (state, action) => {
      state.shortcourseList = action.payload.data;
      state.count = action.payload.count;
      state.pending = false;
    },
    [fetchShortCourse.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updateShortCourse } = shortcourseSlice.actions;

export default shortcourseSlice.reducer;
