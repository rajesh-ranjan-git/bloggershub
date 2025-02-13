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
import { useState } from "react";
import CommentItem from "./commentItem";

const BlogCommentsCard = () => {
  const [commentButtonsBackground, setCommentButtonsBackground] =
    useState(null);

  const handleCommentButtonHover = (e) => {
    if (commentButtonsBackground !== e.target.id) {
      setCommentButtonsBackground(e.target.id);
    } else {
      setCommentButtonsBackground(null);
    }
  };

  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>Recent comments</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="hover:shadow-md p-4 border rounded-md w-full h-[50vh]">
          <CommentItem
            handleCommentButtonHover={handleCommentButtonHover}
            commentButtonsBackground={commentButtonsBackground}
            setCommentButtonsBackground={setCommentButtonsBackground}
          />
          <CommentItem
            handleCommentButtonHover={handleCommentButtonHover}
            commentButtonsBackground={commentButtonsBackground}
            setCommentButtonsBackground={setCommentButtonsBackground}
          />
          <CommentItem
            handleCommentButtonHover={handleCommentButtonHover}
            commentButtonsBackground={commentButtonsBackground}
            setCommentButtonsBackground={setCommentButtonsBackground}
          />
          <CommentItem
            handleCommentButtonHover={handleCommentButtonHover}
            commentButtonsBackground={commentButtonsBackground}
            setCommentButtonsBackground={setCommentButtonsBackground}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BlogCommentsCard;
