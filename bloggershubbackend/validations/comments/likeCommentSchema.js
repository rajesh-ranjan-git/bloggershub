import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const likeCommentSchema = vine.object({
  liked: vine.boolean(),
  commentId: vine.string().uuid(),
  userId: vine.string().uuid(),
});

export default likeCommentSchema;
