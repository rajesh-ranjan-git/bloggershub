import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/customFormElements/customButton";

const CommentItem = ({
  comment,
  handleCommentLike,
  handleUpdateComment,
  handleDeleteComment,
}) => {
  const commentInput = useRef(null);
  const [updatedCommentContent, setUpdatedCommentContent] = useState("");
  const { loggedInUser } = useSelector((state) => state.authReducer);

  const clearComment = () => {
    setUpdatedCommentContent("");
    commentInput.current.value = "";
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center gap-4">
          <Link href={`/profile/${comment?.userId}`}>
            <Avatar>
              <AvatarImage src={comment?.user?.profile?.profileImage} />
              <AvatarFallback className="bg-slate-300">
                {loggedInUser?.profile?.firstName
                  ? loggedInUser?.profile?.firstName?.[0].toUpperCase()
                  : loggedInUser?.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h2 className="font-semibold text-lg">
              <Link
                href={`/profile/${comment?.userId}`}
                className="hover:text-[#a3ab09] transition-all ease-in-out"
              >
                {comment?.user?.profile?.firstName
                  ? comment?.user?.profile?.lastName
                    ? comment?.user?.profile?.middleName
                      ? `${comment?.user?.profile?.firstName} ${comment?.user?.profile?.middleName} ${comment?.user?.profile?.lastName}`
                      : `${comment?.user?.profile?.firstName} ${comment?.user?.profile?.lastName}`
                    : `${comment?.user?.profile?.firstName}`
                  : `${user?.email}`}
              </Link>
            </h2>
            <p className="text-muted-foreground text-sm">
              {comment?.updatedAt.split("T")[0]}
            </p>
          </div>
        </div>
        <div className="my-2 p-2 border rounded-md">
          <p>{comment?.content}</p>
        </div>
        <div className="flex justify-between items-center text-xl">
          <div className="flex justify-between items-center gap-4">
            <Button
              variant="outline"
              className={`${
                comment?.CommentLikes &&
                comment?.CommentLikes.filter(
                  (item) => item.liked && item.userId === loggedInUser?.id
                ).length > 0
                  ? "bg-blue-600 text-white hover:text-blue-600"
                  : "hover:bg-blue-600 text-blue-600 hover:text-white"
              } p-2 border-blue-600 min-w-10 `}
              onClick={
                loggedInUser
                  ? () => handleCommentLike("like", comment?.id)
                  : () =>
                      toast({
                        title: "Invalid request!",
                        description: "Please sign in to like comments!",
                        variant: "destructive",
                      })
              }
            >
              <AiOutlineLike />
              {comment?.likesCount > 0 ? (
                <span className="text-sm">{comment?.likesCount}</span>
              ) : null}
            </Button>
            <Button
              variant="outline"
              className={`${
                comment?.CommentLikes &&
                comment?.CommentLikes.filter(
                  (item) => !item.liked && item.userId === loggedInUser?.id
                ).length > 0
                  ? "bg-red-600 text-white hover:text-red-600"
                  : "hover:bg-red-600 text-red-600 hover:text-white"
              }  p-2 border-red-500 min-w-10 `}
              onClick={
                loggedInUser
                  ? () => handleCommentLike("dislike", comment?.id)
                  : () =>
                      toast({
                        title: "Invalid request!",
                        description: "Please sign in to dislike comments!",
                        variant: "destructive",
                      })
              }
            >
              <BiDislike />
              {comment?.dislikesCount > 0 ? (
                <span className="text-sm">{comment?.dislikesCount}</span>
              ) : null}
            </Button>
          </div>
          {loggedInUser && loggedInUser?.id === comment?.userId ? (
            <div className="flex justify-between items-center gap-4">
              <Drawer>
                <DrawerTrigger
                  className="flex justify-center items-center hover:bg-green-600 p-2 border border-green-600 rounded-md w-10 text-green-600 hover:text-white transition-all ease-in-out"
                  onClick={() => {
                    setUpdatedCommentContent(comment?.content);
                  }}
                >
                  <MdModeEdit />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Update your comment</DrawerTitle>
                    <DrawerDescription className="p-2">
                      <Textarea
                        placeholder="Type your message here..."
                        className="shadow-md focus-visible:shadow-md focus-visible:ring-[#bec44d] w-full text-black"
                        value={updatedCommentContent}
                        ref={commentInput}
                        onChange={(e) => {
                          setUpdatedCommentContent(e.target.value);
                        }}
                      />
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <div className="flex justify-between items-center gap-4 w-full">
                      <DrawerClose
                        className="hover:bg-neutral-200 shadow-md p-2 border border-neutral-200 rounded-md w-full md:w-28 font-semibold transition-all ease-in-out"
                        onClick={() => {
                          clearComment();
                        }}
                      >
                        Cancel
                      </DrawerClose>
                      <CustomButton
                        buttonText="Update Comment"
                        buttonStyle="w-full bg-[#bec44d] hover:bg-[#a3ab09] text-white shadow-md"
                        customButtonAction={() =>
                          handleUpdateComment(
                            comment?.id,
                            updatedCommentContent
                          )
                        }
                        disabled={updatedCommentContent.length < 2}
                      />
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <AlertDialog>
                <AlertDialogTrigger className="flex justify-center items-center hover:bg-red-600 p-2 border border-red-600 rounded-md w-10 text-red-600 hover:text-white transition-all ease-in-out">
                  <MdDelete />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Permanently delete this comment?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your comment.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="shadow-md">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-800 shadow-md"
                      onClick={() => handleDeleteComment(comment?.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : null}
        </div>
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default CommentItem;
