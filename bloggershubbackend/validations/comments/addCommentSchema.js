import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const addCommentSchema = vine.object({
  content: vine.string().trim().minLength(2),
  postId: vine.string().uuid(),
  userId: vine.string().uuid(),
});

export default addCommentSchema;
