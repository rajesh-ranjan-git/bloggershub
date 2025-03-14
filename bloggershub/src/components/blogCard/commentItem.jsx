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
import likeCommentService from "@/services/comments/likeCommentService";

const CommentItem = ({ comment, handleCommentLike, handleDeleteComment }) => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.authReducer);

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
        {loggedInUser && (
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
                onClick={() => handleCommentLike("like", comment?.id)}
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
                onClick={() => handleCommentLike("dislike", comment?.id)}
              >
                <BiDislike />
                {comment?.dislikesCount > 0 ? (
                  <span className="text-sm">{comment?.dislikesCount}</span>
                ) : null}
              </Button>
            </div>
            {loggedInUser?.id === comment?.userId ? (
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
                  onClick={() => handleDeleteComment(comment?.id)}
                >
                  <MdDelete />
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default CommentItem;
