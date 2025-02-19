import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postsReducer from "./posts/postsSlice";
import postReducer from "./posts/postsSlice";
import commentsReducer from "./comments/commentsSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    postsReducer: postsReducer,
    postReducer: postReducer,
    commentsReducer: commentsReducer,
  },
});

export default store;
