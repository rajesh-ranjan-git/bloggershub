"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";
import deleteCommentService from "@/services/comments/deleteCommentService";
import CommentItem from "@/components/blogCard/commentItem";
import likeCommentService from "@/services/comments/likeCommentService";
import updateCommentService from "@/services/comments/updateCommentService";

const BlogCommentsCard = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const postId = blogId;
  const { loggedInUser } = useSelector((state) => state.authReducer);
  const { isCommentsLoading, comments } = useSelector(
    (state) => state.commentsReducer
  );

  const handleCommentLike = (type, commentId) => {
    const liked = type === "like" ? true : type === "dislike" ? false : null;

    if (liked !== null) {
      dispatch(
        likeCommentService({
          liked: liked,
          commentId: commentId,
          userId: loggedInUser?.id,
        })
      ).then((data) => {
        dispatch(fetchAllCommentsOnPostService(postId));
      });
    }
  };

  const handleUpdateComment = (commentId, updatedCommentContent) => {
    dispatch(
      updateCommentService({
        id: commentId,
        content: updatedCommentContent,
        userId: loggedInUser?.id,
      })
    ).then((data) => {
      dispatch(fetchAllCommentsOnPostService(postId));
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteComment = (commentId) => {
    dispatch(
      deleteCommentService({ id: commentId, userId: loggedInUser?.id })
    ).then((data) => {
      dispatch(fetchAllCommentsOnPostService(postId));
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
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
          {!isCommentsLoading ? (
            comments && comments.length > 0 ? (
              comments.map((comment) => (
                <CommentItem
                  comment={comment}
                  key={comment.id}
                  handleCommentLike={handleCommentLike}
                  handleUpdateComment={handleUpdateComment}
                  handleDeleteComment={handleDeleteComment}
                />
              ))
            ) : null
          ) : (
            <div>Comments are loading...</div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BlogCommentsCard;
