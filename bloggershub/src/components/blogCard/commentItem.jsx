import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import editCommentService from "@/services/comments/editCommentService";
import deleteCommentService from "@/services/comments/deleteCommentService";
import likeCommentService from "@/services/comments/likeCommentService";

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.authReducer);

  const handleCommentLike = (type) => {
    const liked = type === "like" ? true : type === "dislike" ? false : null;

    if (liked !== null) {
      dispatch(
        likeCommentService({
          liked: liked,
          commentId: comment?.id,
          userId: loggedInUser?.id,
        })
      );
    }
  };

  const handleEditComment = () => {
    dispatch(
      editCommentService({
        id: comment?.id,
        content: comment?.content,
        userId: loggedInUser?.id,
      })
    ).then((data) => {
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

  const handleDeleteComment = () => {
    dispatch(
      deleteCommentService({ id: comment?.id, userId: loggedInUser?.id })
    ).then((data) => {
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
              className="hover:bg-blue-600 p-0 border-blue-600 w-10 text-blue-600 hover:text-white"
              onClick={() => handleCommentLike("like")}
            >
              <AiOutlineLike />
            </Button>
            <Button
              variant="outline"
              className="hover:bg-red-500 p-0 border-red-500 w-10 text-red-500 hover:text-white"
              onClick={() => handleCommentLike("dislike")}
            >
              <BiDislike />
            </Button>
          </div>
          {loggedInUser && loggedInUser?.id === comment?.userId && (
            <div className="flex justify-between items-center gap-4">
              <Button
                variant="outline"
                className="hover:bg-green-600 p-0 border-green-600 w-10 text-green-600 hover:text-white"
                onClick={() => handleEditComment()}
              >
                <MdModeEdit />
              </Button>
              <Button
                variant="outline"
                className="hover:bg-red-600 p-0 border-red-600 w-10 text-red-600 hover:text-white"
                onClick={() => handleDeleteComment()}
              >
                <MdDelete />
              </Button>
            </div>
          )}
        </div>
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default CommentItem;
