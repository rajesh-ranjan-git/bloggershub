import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const postSchema = vine.object({
  title: vine.string().trim().minLength(2),
  content: vine.string().trim(),
  postImage: vine.string().optional().url(),
  published: vine.boolean().default(false),
  authorId: vine.string().uuid(),
  tags: vine.array(vine.string().trim().minLength(2)).default([]),
});

export default postSchema;
