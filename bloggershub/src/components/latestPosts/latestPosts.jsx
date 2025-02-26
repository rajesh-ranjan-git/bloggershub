"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchLatestPostsService from "@/services/posts/fetchLatestPostsService";
import BlogCard from "@/components/blogCard/blogCard";
import CustomSinglePostLoader from "../customLoaderComponents/customSinglePostLoader";

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
            <CustomSinglePostLoader />
            <CustomSinglePostLoader />
            <CustomSinglePostLoader />
            <CustomSinglePostLoader />
          </>
        </div>
      )}

      {!isLoading &&
        (posts.length > 0 ? (
          <div className="justify-center md:justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
            {posts.map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-10 w-full min-h-40 text-2xl">
            No latest posts available to show...
          </div>
        ))}
    </div>
  );
};

export default LatestPosts;
