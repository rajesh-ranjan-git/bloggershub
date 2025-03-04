"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";
import CommentItem from "@/components/blogCard/commentItem";

const BlogCommentsCard = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const postId = blogId;
  const { isCommentsLoading, comments } = useSelector(
    (state) => state.commentsReducer
  );

  useEffect(() => {
    dispatch(fetchAllCommentsOnPostService(postId));
  }, []);

  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>Recent comments</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="hover:shadow-md p-4 border rounded-md w-full h-[50vh]">
          {!isCommentsLoading ? (
            comments && comments.length > 0 ? (
              comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))
            ) : null
          ) : (
            <div>Comments are loading...</div>
          )}
          {/* {comments && comments.length > 0
            ? comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))
            : null} */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BlogCommentsCard;
