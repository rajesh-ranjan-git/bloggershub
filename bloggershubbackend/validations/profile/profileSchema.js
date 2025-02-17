import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const profileSchema = vine.object({
  firstName: vine.string().trim().minLength(2).optional(),
  middleName: vine.string().trim().minLength(2).optional(),
  lastName: vine.string().trim().minLength(2).optional(),
  bio: vine.string().trim().minLength(2).optional(),
  profileImage: vine.string().optional(),
  userId: vine.string().uuid(),
});

export default profileSchema;
