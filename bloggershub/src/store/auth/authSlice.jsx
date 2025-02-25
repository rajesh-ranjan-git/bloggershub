import checkAuthService from "@/services/auth/checkAuthService";
import signInService from "@/services/auth/signInService";
import signUpService from "@/services/auth/signUpService";
import { createSlice } from "@reduxjs/toolkit";
import forgotPasswordService from "@/services/auth/forgotPasswordService";
import signOutService from "@/services/auth/signOutService";
import firebaseGoogleAuthService from "@/services/auth/firebaseGoogleAuthService";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthService.fulfilled, (state, action) => {
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success;
        state.isLoading = false;
      })
      .addCase(checkAuthService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(signUpService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpService.fulfilled, (state, action) => {
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success;
        state.token = action.payload?.token;
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(action.payload?.token));
      })
      .addCase(signUpService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.token = null;
      })
      .addCase(signInService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInService.fulfilled, (state, action) => {
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success;
        state.token = action.payload?.token;
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(action.payload?.token));
      })
      .addCase(signInService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.token = null;
      })
      .addCase(forgotPasswordService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPasswordService.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signOutService.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.isLoading = false;
        localStorage.clear();
      })
      .addCase(firebaseGoogleAuthService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firebaseGoogleAuthService.fulfilled, (state) => {
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success;
        state.token = action.payload?.token;
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(action.payload?.token));
      })
      .addCase(firebaseGoogleAuthService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.token = null;
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
