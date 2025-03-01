import { AiOutlineLike } from "react-icons/ai";
import { BsReplyAllFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const CommentItem = ({
  handleCommentButtonHover,
  commentButtonsBackground,
  setCommentButtonsBackground,
  comment,
}) => {
  return (
    <>
      <div>
        <div className="flex justify-start items-center gap-4">
          <Avatar>
            <AvatarImage src={comment?.user?.profile?.profileImage} />
            <AvatarFallback>
              {comment?.user?.profile?.firstName || comment?.user?.email || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">
              {comment?.user?.profile?.firstName
                ? comment?.user?.profile?.lastName
                  ? comment?.user?.profile?.middleName
                    ? `${comment?.user?.profile?.firstName} ${comment?.user?.profile?.middleName} ${comment?.user?.profile?.lastName}`
                    : `${comment?.user?.profile?.firstName} ${comment?.user?.profile?.lastName}`
                  : `${comment?.user?.profile?.firstName}`
                : `${user?.email}`}
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
            <div
              className="flex justify-center items-center gap-2 hover:bg-blue-600 p-2 border border-transparent rounded-md min-w-10 hover:min-w-20 hover:text-white transition-all duration-300 ease-in-out cursor-pointer hover:blue-red-600"
              id="like"
              onMouseEnter={(e) => {
                handleCommentButtonHover(e);
              }}
              onMouseLeave={() => {
                setCommentButtonsBackground(null);
              }}
            >
              <AiOutlineLike title="Like" size={20} />
              {commentButtonsBackground &&
              commentButtonsBackground === "like" ? (
                <span className="text-white text-sm transition-all ease-in-out">
                  Like
                </span>
              ) : null}
            </div>
            <div
              className="flex justify-center items-center gap-2 hover:bg-blue-600 p-2 border border-transparent rounded-md min-w-10 hover:min-w-20 hover:text-white transition-all duration-300 ease-in-out cursor-pointer hover:blue-red-600"
              id="reply"
              onMouseEnter={(e) => {
                handleCommentButtonHover(e);
              }}
              onMouseLeave={() => {
                setCommentButtonsBackground(null);
              }}
            >
              <BsReplyAllFill title="Reply" />
              {commentButtonsBackground &&
              commentButtonsBackground === "reply" ? (
                <span className="text-white text-sm transition-all ease-in-out">
                  Reply
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div
              className="flex justify-center items-center gap-2 hover:bg-green-600 p-2 border border-transparent rounded-md min-w-10 hover:min-w-20 hover:text-white transition-all duration-300 ease-in-out cursor-pointer hover:green-red-600"
              id="edit"
              onMouseEnter={(e) => {
                handleCommentButtonHover(e);
              }}
              onMouseLeave={() => {
                setCommentButtonsBackground(null);
              }}
            >
              <FaEdit title="Edit" />
              {commentButtonsBackground &&
              commentButtonsBackground === "edit" ? (
                <span className="text-white text-sm transition-all ease-in-out">
                  Edit
                </span>
              ) : null}
            </div>
            <div
              className="flex justify-center items-center gap-2 hover:bg-red-600 p-2 border border-transparent hover:border-red-600 rounded-md min-w-10 hover:min-w-20 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
              id="delete"
              onMouseEnter={(e) => {
                handleCommentButtonHover(e);
              }}
              onMouseLeave={() => {
                setCommentButtonsBackground(null);
              }}
            >
              <MdDelete title="Delete" />
              {commentButtonsBackground &&
              commentButtonsBackground === "delete" ? (
                <span className="text-white text-sm transition-all ease-in-out">
                  Delete
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default CommentItem;
