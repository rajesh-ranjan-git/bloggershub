import fetchAllPostsService from "@/services/posts/fetchAllPostsService";
import fetchLatestPostsService from "@/services/posts/fetchLatestPostsService";
import fetchSinglePostService from "@/services/posts/fetchSinglePostService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  posts: [],
  post: null,
};

const PostsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPostsService.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.isLoading = false;
      })
      .addCase(fetchAllPostsService.rejected, (state) => {
        state.posts = [];
        state.isLoading = false;
      })
      .addCase(fetchLatestPostsService.pending, (state) => {
        state.posts = [];
        state.isLoading = false;
      })
      .addCase(fetchLatestPostsService.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.isLoading = false;
      })
      .addCase(fetchLatestPostsService.rejected, (state) => {
        state.posts = [];
        state.isLoading = false;
      })
      .addCase(fetchSinglePostService.pending, (state) => {
        state.post = null;
        state.isLoading = true;
      })
      .addCase(fetchSinglePostService.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.isLoading = false;
      })
      .addCase(fetchSinglePostService.rejected, (state) => {
        state.post = null;
        state.isLoading = false;
      });
  },
});

// export const { postsActions } = PostsSlice.actions;
export default PostsSlice.reducer;
