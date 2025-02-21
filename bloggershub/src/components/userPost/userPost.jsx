"use client";

import { useDispatch, useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import UserBlogPost from "./userBlogPost";
import UserPostDetails from "./userPostDetails";
import fetchAllPostsByAuthorService from "@/services/posts/fetchAllPostsByAuthorService";
import { useEffect } from "react";
import checkAuthService from "@/services/auth/checkAuthService";

const UserPost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { isLoading, posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllPostsByAuthorService({ authorId: user?.id }));
    } else {
      dispatch(checkAuthService());
    }
  }, [dispatch, user]);

  return (
    <>
      {!isLoading && posts && posts.length > 0
        ? posts.map((post) => (
            <div
              className="flex md:flex-row flex-col items-center bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg w-full lg:h-40 overflow-clip"
              key={post?.id}
            >
              <UserBlogPost post={post} />
              <Separator orientation="vertical" className="hidden md:block" />
              <UserPostDetails post={post} />
            </div>
          ))
        : "No posts found!"}
    </>
  );
};

export default UserPost;
