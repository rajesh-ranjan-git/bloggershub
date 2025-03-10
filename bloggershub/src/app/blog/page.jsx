"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllPostsService from "@/services/posts/fetchAllPostsService";
import BlogCard from "@/components/blogCard/blogCard";
import CustomSinglePostLoader from "@/components/customLoaderComponents/customSinglePostLoader";

const Blog = () => {
  const dispatch = useDispatch();
  const { isPostLoading, posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(fetchAllPostsService());
  }, []);

  return (
    <section className="flex justify-center pt-16 w-full">
      <div className="flex flex-col justify-center px-10 w-full">
        <div className="p-5 border-[#a3ab09] border-b-4 w-full xl:w-1/6 font-semibold text-3xl xl:text-left text-center">
          All Posts
        </div>
        {isPostLoading && (
          <div className="flex flex-wrap justify-center xl:justify-between items-center gap-10 py-10 w-full">
            <>
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
              <CustomSinglePostLoader />
            </>
          </div>
        )}

        {!isPostLoading &&
          (posts.length > 0 ? (
            <div className="flex flex-wrap justify-center xl:justify-between items-center gap-10 py-10 w-full">
              {posts.map((post) => (
                <BlogCard post={post} key={post.id} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10 w-full h-dvh text-2xl">
              No posts available to show...
            </div>
          ))}
      </div>
    </section>
  );
};

export default Blog;
