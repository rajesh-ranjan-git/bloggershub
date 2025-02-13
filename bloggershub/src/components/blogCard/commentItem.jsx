import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiFillDelete,
} from "react-icons/ai";
import { BsReplyAllFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CommentItem = ({
  handleCommentButtonHover,
  commentButtonsBackground,
  setCommentButtonsBackground,
}) => {
  return (
    <>
      <div>
        <div className="flex justify-start items-center gap-4">
          <Avatar>
            <AvatarImage src="/images/latest_pic.png" />
            <AvatarFallback>RR</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">Rajesh Ranjan</h2>
            <p className="text-muted-foreground text-sm">13/02/2025</p>
          </div>
        </div>
        <div className="my-2 p-2 border rounded-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            et voluptas, veritatis quas sed eligendi quos sit omnis nobis
            exercitationem laboriosam suscipit totam sunt vel eius impedit
            maiores eaque temporibus? Atque, labore? Magnam eos perferendis
            dolor dicta numquam. Nisi omnis molestiae facilis cum numquam iusto
            est molestias fugiat consectetur laudantium, similique cupiditate
            eligendi error quis maiores, doloremque fugit porro vero!
          </p>
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
