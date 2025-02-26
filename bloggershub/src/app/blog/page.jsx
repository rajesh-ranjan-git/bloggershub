"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/components/blogCard/blogCard";
import fetchAllPostsService from "@/services/posts/fetchAllPostsService";

const Blog = () => {
  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(fetchAllPostsService());
  }, []);

  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        <div className="p-5 border-b-4 border-blue-400 w-full md:w-1/3 xl:w-1/6 font-semibold text-3xl xl:text-left text-center">
          Latest Posts
        </div>
        <div className="justify-center md:justify-between gap-10 grid md:grid-cols-2 xl:grid-cols-4 py-10 w-full">
          {isLoading && <div>Posts are loading...</div>}
          {posts && posts.length > 0
            ? posts.map((post) => <BlogCard post={post} key={post.id} />)
            : null}
        </div>
      </div>
    </section>
  );
};

export default Blog;
