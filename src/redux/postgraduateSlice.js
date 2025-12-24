import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchPostgraduate = createAsyncThunk('postgraduate/fetchPostgraduate', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/course/list?programme=postgraduate`);
  const data = details.data.results;
  const count = details.data.count;
  const result = { data, count };
  return result;
});

const postgraduateSlice = createSlice({
  name: 'postgraduate',
  initialState: {
    postgraduateSliceList: [],
    pending: false,
    error: false
  },
  reducers: {
    updatePostgraduate: (state, action) => {
      state.postgraduateList = action.payload;
    }
  },
  extraReducers: {
    [fetchPostgraduate.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchPostgraduate.fulfilled]: (state, action) => {
      state.postgraduateList = action.payload.data;
      state.count = action.payload.count;
      state.pending = false;
    },
    [fetchPostgraduate.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updatePostgraduate } = postgraduateSlice.actions;

export default postgraduateSlice.reducer;
