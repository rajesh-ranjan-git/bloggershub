import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postsReducer from "./posts/postsSlice";
import postReducer from "./posts/postsSlice";
import commentsReducer from "./comments/commentsSlice";
import profileReducer from "./profile/profileSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    postsReducer: postsReducer,
    postReducer: postReducer,
    commentsReducer: commentsReducer,
    profileReducer: profileReducer,
  },
});

export default store;
