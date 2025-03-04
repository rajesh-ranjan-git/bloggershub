import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const deleteCommentSchema = vine.object({
  id: vine.string().uuid(),
  userId: vine.string().uuid(),
});

export default deleteCommentSchema;
