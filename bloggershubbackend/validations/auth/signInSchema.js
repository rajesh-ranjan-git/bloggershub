import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

const signInSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export default signInSchema;
