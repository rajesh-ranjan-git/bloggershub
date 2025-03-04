import { createSlice } from "@reduxjs/toolkit";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";
import addCommentService from "@/services/comments/addCommentService";

const initialState = {
  isCommentsLoading: true,
  comments: [],
  newComment: null,
};

const CommentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCommentsOnPostService.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchAllCommentsOnPostService.fulfilled, (state, action) => {
        state.comments = action.payload?.comments;
        state.isCommentsLoading = false;
      })
      .addCase(fetchAllCommentsOnPostService.rejected, (state) => {
        state.comments = [];
        state.isCommentsLoading = false;
      })
      .addCase(addCommentService.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(addCommentService.fulfilled, (state) => {
        state.newComment = action.payload?.comment;
        state.isCommentsLoading = false;
      })
      .addCase(addCommentService.rejected, (state) => {
        state.isCommentsLoading = false;
      });
  },
});

// export const { commentsActions } = CommentsSlice.actions;
export default CommentsSlice.reducer;
