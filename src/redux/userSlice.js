// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Dummy thunks (always succeed with guest user) ---
export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  return {
    email: "guest@demo.com",
    firstName: "Guest",
    lastName: "User",
    profile_pic: "",
  };
});

export const fetchUser2 = createAsyncThunk("users/fetchUser2", async () => {
  return {
    email: "guest@demo.com",
    firstName: "Guest",
    lastName: "User",
    profile_pic: "",
  };
});

export const fetchUser3 = createAsyncThunk("users/fetchUser3", async () => {
  return {
    email: "guest@demo.com",
    firstName: "Guest",
    lastName: "User",
    profile_pic: "",
  };
});

// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      profile_pic: "",
    },
    pending: false,
    error: false,
    isLoggedIn: true, // start as "logged in" by default
  },
  reducers: {
    update: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.isLoggedIn = true;
    },
    [fetchUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
      state.isLoggedIn = false;
    },

    [fetchUser2.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.isLoggedIn = true;
    },

    [fetchUser3.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.isLoggedIn = true;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
