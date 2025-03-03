import { createSlice } from "@reduxjs/toolkit";
import fetchAllPostsByAuthorService from "@/services/posts/fetchAllPostsByAuthorService";
import fetchAllPostsService from "@/services/posts/fetchAllPostsService";
import fetchLatestPostsService from "@/services/posts/fetchLatestPostsService";
import fetchSinglePostService from "@/services/posts/fetchSinglePostService";

const initialState = {
  isPostLoading: true,
  posts: [],
  post: null,
  author: null,
};

const PostsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestPostsService.pending, (state) => {
        state.posts = [];
        state.isPostLoading = false;
      })
      .addCase(fetchLatestPostsService.fulfilled, (state, action) => {
        state.posts = action.payload?.posts;
        state.isPostLoading = false;
      })
      .addCase(fetchLatestPostsService.rejected, (state) => {
        state.posts = [];
        state.isPostLoading = false;
      })
      .addCase(fetchAllPostsService.pending, (state) => {
        state.isPostLoading = true;
      })
      .addCase(fetchAllPostsService.fulfilled, (state, action) => {
        state.posts = action.payload?.posts;
        state.isPostLoading = false;
      })
      .addCase(fetchAllPostsService.rejected, (state) => {
        state.posts = [];
        state.isPostLoading = false;
      })
      .addCase(fetchSinglePostService.pending, (state) => {
        state.post = null;
        state.author = null;
        state.isPostLoading = true;
      })
      .addCase(fetchSinglePostService.fulfilled, (state, action) => {
        state.post = action.payload?.post;
        state.author = action.payload?.author;
        state.isPostLoading = false;
      })
      .addCase(fetchSinglePostService.rejected, (state) => {
        state.post = null;
        state.isPostLoading = false;
      })
      .addCase(fetchAllPostsByAuthorService.pending, (state) => {
        state.posts = [];
        state.isPostLoading = true;
      })
      .addCase(fetchAllPostsByAuthorService.fulfilled, (state, action) => {
        state.posts = action.payload?.posts;
        state.isPostLoading = false;
      })
      .addCase(fetchAllPostsByAuthorService.rejected, (state) => {
        state.posts = [];
        state.isPostLoading = false;
      });
  },
});

// export const { postsActions } = PostsSlice.actions;
export default PostsSlice.reducer;
