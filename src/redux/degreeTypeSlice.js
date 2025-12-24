import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchDegreeTypes = createAsyncThunk('degreeTypes/fetchDegreeTypes', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/degree_type/list`);
  const result = details.data.results;
  return result;
});

const degreeTypesSlice = createSlice({
  name: 'degreeTypes',
  initialState: {
    degreeTypesList: [],
    pending: false,
    error: false
  },
  reducers: {
    updateDegreeTypes: (state, action) => {
      state.degreeTypesList = action.payload;
    }
  },
  extraReducers: {
    [fetchDegreeTypes.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchDegreeTypes.fulfilled]: (state, action) => {
      state.degreeTypesList = action.payload;
      state.pending = false;
    },
    [fetchDegreeTypes.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updateDegreeTypes } = degreeTypesSlice.actions;

export default degreeTypesSlice.reducer;
