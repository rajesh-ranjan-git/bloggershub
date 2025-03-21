import { createSlice } from "@reduxjs/toolkit";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";
import addCommentService from "@/services/comments/addCommentService";
import updateCommentService from "@/services/comments/updateCommentService";
import deleteCommentService from "@/services/comments/deleteCommentService";
import likeCommentService from "@/services/comments/likeCommentService";

const initialState = {
  isCommentsLoading: true,
  comments: [],
  comment: null,
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
      .addCase(addCommentService.fulfilled, (state, action) => {
        state.comment = action.payload?.comment;
        state.isCommentsLoading = false;
      })
      .addCase(addCommentService.rejected, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(updateCommentService.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(updateCommentService.fulfilled, (state, action) => {
        state.comment = action.payload?.comment;
        state.isCommentsLoading = false;
      })
      .addCase(updateCommentService.rejected, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(deleteCommentService.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(deleteCommentService.fulfilled, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(deleteCommentService.rejected, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(likeCommentService.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(likeCommentService.fulfilled, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(likeCommentService.rejected, (state) => {
        state.isCommentsLoading = false;
      });
  },
});

// export const { commentsActions } = CommentsSlice.actions;
export default CommentsSlice.reducer;
