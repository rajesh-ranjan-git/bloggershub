import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const postSchema = vine.object({
  title: vine.string().trim().minLength(2),
  content: vine.string().trim().minLength(2),
  postImage: vine.string().optional(),
  published: vine.boolean(),
  authorId: vine.string().uuid(),
  tags: vine.array(vine.string().trim().minLength(2)),
});

export default postSchema;
