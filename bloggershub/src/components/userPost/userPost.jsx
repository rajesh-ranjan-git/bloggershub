"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import fetchAllPostsByAuthorService from "@/services/posts/fetchAllPostsByAuthorService";
import checkAuthService from "@/services/auth/checkAuthService";
import UserBlogPost from "@/components/userPost/userBlogPost";
import UserPostDetails from "@/components/userPost/userPostDetails";

const UserPost = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const { isLoading, posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchAllPostsByAuthorService({ authorId: loggedInUser?.id }));
    } else {
      dispatch(checkAuthService());
    }
  }, [dispatch, loggedInUser]);

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
