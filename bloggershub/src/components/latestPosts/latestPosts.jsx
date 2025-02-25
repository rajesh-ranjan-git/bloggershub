"use client";

import { useEffect } from "react";
import BlogCard from "../blogCard/blogCard";
import { useDispatch, useSelector } from "react-redux";
import fetchLatestPostsService from "@/services/posts/fetchLatestPostsService";
import { toast } from "@/hooks/use-toast";

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
      <div className="flex md:flex-row flex-col flex-wrap justify-center items-center gap-10 py-10 w-full">
        {isLoading && <div>Posts are loading...</div>}
        {posts && posts.length > 0
          ? posts.map((post) => <BlogCard post={post} key={post.id} />)
          : null}
      </div>
    </div>
  );
};

export default LatestPosts;
