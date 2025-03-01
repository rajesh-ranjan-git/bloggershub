import { createSlice } from "@reduxjs/toolkit";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";

const initialState = {
  isLoading: true,
  comments: [],
};

const CommentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCommentsOnPostService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCommentsOnPostService.fulfilled, (state, action) => {
        state.comments = action.payload?.comments;
        state.isLoading = false;
      })
      .addCase(fetchAllCommentsOnPostService.rejected, (state) => {
        state.comments = [];
        state.isLoading = false;
      });
  },
});

// export const { commentsActions } = CommentsSlice.actions;
export default CommentsSlice.reducer;
