"use client";

import BlogAddCommentsCard from "@/components/blogCard/blogAddCommentsCard";
import BlogCommentsCard from "@/components/blogCard/blogCommentsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fetchSinglePostService from "@/services/posts/fetchSinglePostService";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogItem = () => {
  const { blogId } = useParams();
  const postId = blogId;
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.postReducer);

  console.log("post : ", post);

  useEffect(() => {
    console.log("postId : ", postId);
    dispatch(fetchSinglePostService(postId));
  }, []);
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="flex flex-col justify-center md:justify-normal gap-4 px-10 w-full">
        <div className="min-w-96">
          <Card className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl">{post?.title}</CardTitle>
              <CardDescription>
                Posted By : <span className="font-bold">{post?.authorId}</span>{" "}
                | <span>{post?.updatedAt.split("T")[0]}</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex lg:flex-row flex-col gap-6 w-full text-md">
          <div className="rounded-lg w-full lg:w-1/2">
            <Image
              className="hover:shadow-md rounded-lg w-full min-h-96"
              src={post?.postImage || "/images/blog.jpg"}
              alt="blogImage"
              width={300}
              height={300}
            />
          </div>
          <Card className="hover:shadow-md p-4 w-full lg:w-1/2">
            <p>{post?.content}</p>
          </Card>
        </div>
        <div className="min-w-96">
          <BlogAddCommentsCard />
        </div>
        <div className="min-w-96">
          <BlogCommentsCard />
        </div>
      </div>
    </section>
  );
};

export default BlogItem;
