import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const updatePostSchema = vine.object({
  title: vine.string().trim().optional(),
  content: vine.string().trim().optional(),
  // tags: vine.string().trim().optional(),
  authorId: vine.string().uuid(),
});

export default updatePostSchema;
