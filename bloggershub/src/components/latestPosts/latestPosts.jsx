"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchLatestPostsService from "@/services/posts/fetchLatestPostsService";
import BlogCard from "@/components/blogCard/blogCard";
import CustomPostSkeleton from "../customLoaderComponents/customPostSkeleton";

const LatestPosts = () => {
  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(fetchLatestPostsService());
  }, []);

  return (
    <div className="flex flex-col justify-center items-center px-10">
      <div className="px-10 py-8 border-b-4 border-blue-400 font-semibold text-5xl">
        Latest Posts
      </div>
      {isLoading && (
        <div className="justify-center md:justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
          <>
            <CustomPostSkeleton />
            <CustomPostSkeleton />
            <CustomPostSkeleton />
            <CustomPostSkeleton />
          </>
        </div>
      )}
      {posts && posts.length > 0 ? (
        <div className="justify-center md:justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
          {posts.map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-10 w-full h-1/2 text-2xl">
          No posts available to show...
        </div>
      )}
    </div>
  );
};

export default LatestPosts;
