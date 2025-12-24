import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    showLogin: false,
  },
  reducers: {
    showLoginModal: (state) => {
      state.showLogin = true;
    },
    hideLoginModal: (state) => {
      state.showLogin = false;
    },
  },
});

export const { showLoginModal, hideLoginModal } = loginSlice.actions;
export default loginSlice.reducer;