import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchCertificate = createAsyncThunk('certificate/fetchCertificate', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/course/list?programme=Certificate Courses`);
  const data = details.data.results;
  const count = details.data.count;
  const result = { data, count };
  return result;
});

const certificateSlice = createSlice({
  name: 'certificate',
  initialState: {
    certificateList: [],
    count: 0,
    pending: false,
    error: false
  },
  reducers: {
    updateCertificate: (state, action) => {
      state.certificateList = action.payload;
    }
  },
  extraReducers: {
    [fetchCertificate.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchCertificate.fulfilled]: (state, action) => {
      state.certificateList = action.payload.data;
      state.count = action.payload.count;
      state.pending = false;
    },
    [fetchCertificate.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updateCertificate } = certificateSlice.actions;

export default certificateSlice.reducer;