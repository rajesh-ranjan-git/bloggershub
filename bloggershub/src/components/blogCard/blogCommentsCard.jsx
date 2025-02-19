"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import CommentItem from "./commentItem";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPost";
import { useParams } from "next/navigation";

const BlogCommentsCard = () => {
  const [commentButtonsBackground, setCommentButtonsBackground] =
    useState(null);
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const postId = blogId;
  const { comments } = useSelector((state) => state.commentsReducer);

  const handleCommentButtonHover = (e) => {
    if (commentButtonsBackground !== e.target.id) {
      setCommentButtonsBackground(e.target.id);
    } else {
      setCommentButtonsBackground(null);
    }
  };

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
          {comments && comments.length > 0
            ? comments.map((comment) => (
                <CommentItem
                  handleCommentButtonHover={handleCommentButtonHover}
                  commentButtonsBackground={commentButtonsBackground}
                  setCommentButtonsBackground={setCommentButtonsBackground}
                  comment={comment}
                  key={comment.id}
                />
              ))
            : null}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BlogCommentsCard;
