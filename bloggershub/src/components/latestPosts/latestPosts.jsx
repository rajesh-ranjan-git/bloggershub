"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchLatestPostsService from "@/services/posts/fetchLatestPostsService";
import BlogCard from "@/components/blogCard/blogCard";
import CustomSinglePostLoader from "../customLoaderComponents/customSinglePostLoader";

const LatestPosts = () => {
  const dispatch = useDispatch();
  const { isPostLoading, posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(fetchLatestPostsService());
  }, []);

  return (
    <div className="flex flex-col justify-center items-center px-10">
      <div className="px-10 py-8 border-[#a3ab09] border-b-4 font-semibold text-4xl md:text-5xl">
        Latest Posts
      </div>
      {isPostLoading && (
        <div className="flex flex-wrap justify-center items-center gap-10 py-10 w-full">
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
          <CustomSinglePostLoader />
        </div>
      )}

      {!isPostLoading &&
        (posts.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-10 py-10 w-full">
            {posts.map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-10 w-full min-h-dvh text-lg md:text-2xl">
            No latest posts available to show...
          </div>
        ))}
    </div>
  );
};

export default LatestPosts;
