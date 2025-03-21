import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/customFormElements/customButton";
import addCommentService from "@/services/comments/addCommentService";
import fetchAllCommentsOnPostService from "@/services/comments/fetchAllCommentsOnPostService";

const BlogAddCommentsCard = ({ postId }) => {
  const commentInput = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.authReducer);

  const handleAddComment = (postId) => {
    dispatch(
      addCommentService({
        content: commentContent,
        postId: postId,
        userId: loggedInUser?.id,
      })
    ).then((data) => {
      dispatch(fetchAllCommentsOnPostService(postId));
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        clearComment();
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  const clearComment = () => {
    setCommentContent("");
    commentInput.current.value = "";
  };

  return (
    <Card className="hover:shadow-md w-full">
      <CardHeader>
        <CardTitle>Add Comments</CardTitle>
        <CardDescription>Post your comment here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your message here..."
          className="shadow-md focus-visible:shadow-md focus-visible:ring-[#bec44d] w-full"
          ref={commentInput}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button
          variant="outline"
          className="shadow-md"
          onClick={() => {
            clearComment();
          }}
        >
          Cancel
        </Button>
        <CustomButton
          buttonText="Add Comment"
          buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
          customButtonAction={() => handleAddComment(postId)}
          disabled={commentContent.length < 2}
        />
      </CardFooter>
    </Card>
  );
};

export default BlogAddCommentsCard;
