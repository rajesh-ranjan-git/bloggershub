import { createSlice } from "@reduxjs/toolkit";
import checkAuthService from "@/services/auth/checkAuthService";
import signInService from "@/services/auth/signInService";
import signUpService from "@/services/auth/signUpService";
import forgotPasswordService from "@/services/auth/forgotPasswordService";
import signOutService from "@/services/auth/signOutService";
import firebaseGoogleAuthService from "@/services/auth/firebaseGoogleAuthService";

const initialState = {
  isAuthenticated: false,
  isLoggedInUserLoading: true,
  authToken: null,
  loggedInUser: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthService.pending, (state) => {
        state.isLoggedInUserLoading = true;
      })
      .addCase(checkAuthService.fulfilled, (state, action) => {
        state.loggedInUser = action.payload?.success
          ? action.payload?.loggedInUser
          : null;
        state.isAuthenticated = action.payload?.success;
        state.isLoggedInUserLoading = false;
      })
      .addCase(checkAuthService.rejected, (state) => {
        state.loggedInUser = null;
        state.isAuthenticated = false;
        state.isLoggedInUserLoading = false;
      })
      .addCase(signUpService.pending, (state) => {
        state.isLoggedInUserLoading = true;
      })
      .addCase(signUpService.fulfilled, (state, action) => {
        state.loggedInUser = action.payload?.success
          ? action.payload?.loggedInUser
          : null;
        state.isAuthenticated = action.payload?.success;
        state.authToken = action.payload?.authToken;
        state.isLoggedInUserLoading = false;
        localStorage.setItem(
          "authToken",
          JSON.stringify(action.payload?.authToken)
        );
      })
      .addCase(signUpService.rejected, (state) => {
        state.loggedInUser = null;
        state.isAuthenticated = false;
        state.isLoggedInUserLoading = false;
        state.authToken = null;
      })
      .addCase(signInService.pending, (state) => {
        state.isLoggedInUserLoading = true;
      })
      .addCase(signInService.fulfilled, (state, action) => {
        state.loggedInUser = action.payload?.success
          ? action.payload?.loggedInUser
          : null;
        state.isAuthenticated = action.payload?.success;
        state.authToken = action.payload?.authToken;
        state.isLoggedInUserLoading = false;
        localStorage.setItem(
          "authToken",
          JSON.stringify(action.payload?.authToken)
        );
      })
      .addCase(signInService.rejected, (state) => {
        state.loggedInUser = null;
        state.isAuthenticated = false;
        state.isLoggedInUserLoading = false;
        state.authToken = null;
      })
      .addCase(forgotPasswordService.pending, (state) => {
        state.isLoggedInUserLoading = true;
      })
      .addCase(forgotPasswordService.fulfilled, (state) => {
        state.isLoggedInUserLoading = false;
      })
      .addCase(forgotPasswordService.rejected, (state) => {
        state.isLoggedInUserLoading = false;
      })
      .addCase(signOutService.fulfilled, (state, action) => {
        state.loggedInUser = null;
        state.isAuthenticated = false;
        state.authToken = null;
        state.isLoggedInUserLoading = false;
        localStorage.clear();
      })
      .addCase(firebaseGoogleAuthService.pending, (state) => {
        state.isLoggedInUserLoading = true;
      })
      .addCase(firebaseGoogleAuthService.fulfilled, (state) => {
        state.loggedInUser = action.payload?.success
          ? action.payload?.loggedInUser
          : null;
        state.isAuthenticated = action.payload?.success;
        state.authToken = action.payload?.authToken;
        state.isLoggedInUserLoading = false;
        localStorage.setItem(
          "authToken",
          JSON.stringify(action.payload?.authToken)
        );
      })
      .addCase(firebaseGoogleAuthService.rejected, (state) => {
        state.loggedInUser = null;
        state.isAuthenticated = false;
        state.isLoggedInUserLoading = false;
        state.authToken = null;
      });
  },
});

// export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
