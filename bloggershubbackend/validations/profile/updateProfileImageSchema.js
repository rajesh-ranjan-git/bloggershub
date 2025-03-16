import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const updateProfileImageSchema = vine.object({
  profileImage: vine.string().url(),
  userId: vine.string().uuid(),
});

export default updateProfileImageSchema;
