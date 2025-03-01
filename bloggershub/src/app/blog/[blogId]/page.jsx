"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import fetchSinglePostService from "@/services/posts/fetchSinglePostService";
import BlogAddCommentsCard from "@/components/blogCard/blogAddCommentsCard";
import BlogCommentsCard from "@/components/blogCard/blogCommentsCard";
import CustomPostTitleLoader from "@/components/customLoaderComponents/customPostTitleLoader";
import CustomPostImageLoader from "@/components/customLoaderComponents/customPostImageLoader";
import CustomPostContentLoader from "@/components/customLoaderComponents/customPostContentLoader";

const BlogItem = () => {
  const { blogId } = useParams();
  const postId = blogId;
  const dispatch = useDispatch();
  const { isLoading, post, author } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(fetchSinglePostService(postId));
  }, []);

  return (
    <section className="flex justify-center py-20 w-full">
      {isLoading && (
        <div className="flex flex-col justify-center md:justify-normal gap-4 px-10 w-full">
          <div className="w-full">
            <Card className="hover:shadow-md">
              <CustomPostTitleLoader />
            </Card>
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full text-md">
            <div className="hover:shadow-md rounded-lg w-full lg:w-1/2">
              <CustomPostImageLoader />
            </div>
            <Card className="hover:shadow-md p-4 w-full lg:w-1/2">
              <CustomPostContentLoader />
            </Card>
          </div>
          <Card className="hover:shadow-md p-4 w-full">
            <CustomPostContentLoader />
          </Card>
        </div>
      )}
      {!isLoading &&
        (post ? (
          <div className="flex flex-col justify-center md:justify-normal gap-4 px-10 w-full">
            <div className="min-w-96">
              <Card className="hover:shadow-md">
                <CardHeader>
                  <CardTitle
                    className="text-3xl line-clamp-3"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {post?.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-md md:text-xl">
                    <Avatar>
                      <AvatarImage src={author?.profileImage} />
                      <AvatarFallback>
                        {author?.name.split()[0].toUpperCase() ||
                          author?.email.split()[0].toUpperCase() ||
                          "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span>Posted By :</span>
                    <span className="font-bold">
                      {author?.name || author?.email || "Anonymous"}
                    </span>
                    <span className="hidden md:block">
                      | {post?.updatedAt.split("T")[0]}
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="flex lg:flex-row flex-col gap-6 w-full text-md">
              <div className="rounded-lg w-full lg:w-1/2">
                <Image
                  className="hover:shadow-md rounded-lg w-full min-h-96 object-cover"
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
        ) : (
          <div className="flex justify-center items-center py-10 w-full h-dvh text-2xl">
            Unable to fetch post details...
          </div>
        ))}
    </section>
  );
};

export default BlogItem;
