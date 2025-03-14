import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const updateCommentSchema = vine.object({
  id: vine.string().uuid(),
  content: vine.string().trim().minLength(2),
  userId: vine.string().uuid(),
});

export default updateCommentSchema;
