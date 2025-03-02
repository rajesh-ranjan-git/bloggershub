import { createSlice } from "@reduxjs/toolkit";
import fetchProfileService from "@/services/profile/fetchProfileService";

const initialState = {
  isLoading: true,
  userProfile: null,
};

const ProfileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileService.fulfilled, (state, action) => {
        state.userProfile = action.payload?.user;
        state.isLoading = false;
      })
      .addCase(fetchProfileService.rejected, (state, action) => {
        state.userProfile = null;
        state.isLoading = false;
      });
  },
});

// export const { profileActions } = ProfileSlice.actions;
export default ProfileSlice.reducer;
