import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

const firebaseGoogleAuthSchema = vine.object({
  email: vine.string().email(),
  name: vine.string().minLength(2).maxLength(191),
  profileImage: vine.string().optional(),
});

export default firebaseGoogleAuthSchema;
