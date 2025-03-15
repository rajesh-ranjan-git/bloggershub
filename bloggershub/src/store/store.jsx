import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth/authSlice";
import postsReducer from "@/store/posts/postsSlice";
import commentsReducer from "@/store/comments/commentsSlice";
import profileReducer from "@/store/profile/profileSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    postsReducer: postsReducer,
    commentsReducer: commentsReducer,
    profileReducer: profileReducer,
  },
});

export default store;
