import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

const signUpSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20).confirmed(),
});

export default signUpSchema;
