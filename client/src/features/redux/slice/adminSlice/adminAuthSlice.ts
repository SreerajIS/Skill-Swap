import { createSlice } from '@reduxjs/toolkit';



const initialState= {
  loggedIn: false
};

const adminAuthSlice = createSlice({
  name: 'admin-auth',
  initialState,
  reducers: {
    adminlogin: (state) => {
      state.loggedIn= true;
    },
    adminlogout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { adminlogin, adminlogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
