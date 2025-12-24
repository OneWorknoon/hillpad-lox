import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

let initialState = {
  courses: [],
  pending: false,
  error: false
};

let email = '';

export const fetchWishList = createAsyncThunk('wishList/fetchWishList', async () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  axios.defaults.withCredentials = true;
  const details = await axios.get(`${APP_BASE_URL}account/detail`);
  const result = details.data;
  const wishlist = await axios.get(`${APP_BASE_URL}wishlists/list?email=${result.email}`);
  email = result.email;
  const wishdata = wishlist.data;
  return wishdata;
});


const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addCourseToWishList(state, action) {
      const exists = state.courses.some(course => course.id === action.payload.id);
      if (!exists) {
        state.courses.push(action.payload);
      }
      const APP_BASE_URL = config.VITE_BASE_URL;
      // console.log("post email", email)
      axios.post(`${APP_BASE_URL}wishlists/create`, { user: email, course: action.payload.id })
        .then(response => {
          console.log('Course successfully added to wishlist:', response.data);
        })
        .catch(error => {
          console.error('Error adding course to wishlist:', error);
        });
    },

    removeCourseFromWishList(state, action) {
      state.courses = state.courses.filter(course => course.id !== action.payload.id);
      console.log('Course removed:', state.courses);
      const APP_BASE_URL = config.VITE_BASE_URL;
      axios.delete(`${APP_BASE_URL}wishlists/delete`, { data: { email, course: action.payload.id } })
        .then(response => {
          console.log('Course successfully removed from wishlist:', response.data);
        })
        .catch(error => {
          console.error('Error removing course from wishlist:', error);
        });
    }
  },
  extraReducers: {
    [fetchWishList.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchWishList.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.pending = false;
    },
    [fetchWishList.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  }
});

export const { addCourseToWishList, removeCourseFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;