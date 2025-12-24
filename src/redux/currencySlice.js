import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const details = await axios.get(`${APP_BASE_URL}academics/currency/list?page_size=${1000}`);
  const result = details.data.results;
  return result;
});

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    currenciesList: [],
    pending: false,
    error: false
  },
  reducers: {
    updateCurrencies: (state, action) => {
      state.currenciesList = action.payload;
    }
  },
  extraReducers: {
    [fetchCurrencies.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchCurrencies.fulfilled]: (state, action) => {
      state.currenciesList = action.payload;
      state.pending = false;
    },
    [fetchCurrencies.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    }
  }
});

export const { updateCurrencies } = currenciesSlice.actions;

export default currenciesSlice.reducer;
