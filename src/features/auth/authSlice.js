// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, businessName: null, businessId: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { businessName, businessId, accessToken } = action.payload;
      state.isAuthenticated = true;
      state.businessName = businessName;
      state.businessId = businessId;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.businessName = null;
      state.businessId = null;
      state.token = null;
    }
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
