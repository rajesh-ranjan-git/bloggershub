"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import fetchAllPostsByAuthorService from "@/services/posts/fetchAllPostsByAuthorService";
import UserBlogPost from "@/components/userPost/userBlogPost";
import UserPostDetails from "@/components/userPost/userPostDetails";
import deletePostService from "@/services/posts/deletePostService";

const UserPost = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const { isPostLoading, posts } = useSelector((state) => state.postsReducer);

  const handleDeletePost = (postId) => {
    if (loggedInUser) {
      dispatch(deletePostService({ postId, authorId: loggedInUser?.id })).then(
        (data) => {
          dispatch(
            fetchAllPostsByAuthorService({ authorId: loggedInUser?.id })
          );
          if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            });
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchAllPostsByAuthorService({ authorId: loggedInUser?.id }));
    }
  }, [dispatch]);

  return (
    <>
      {!isPostLoading ? (
        posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="flex md:flex-row flex-col items-center bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg w-full lg:h-40 overflow-clip"
              key={post?.id}
            >
              <UserBlogPost post={post} />
              <Separator orientation="vertical" className="hidden md:block" />
              <UserPostDetails
                post={post}
                handleDeletePost={handleDeletePost}
              />
            </div>
          ))
        ) : (
          <div className="w-full h-dvh text-center">No posts found...</div>
        )
      ) : (
        <div className="w-full h-dvh text-center">Loading posts...</div>
      )}
    </>
  );
};

export default UserPost;
