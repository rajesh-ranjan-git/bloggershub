import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

const deleteAccountSchema = vine.object({
  userId: vine.string().uuid(),
});

export default deleteAccountSchema;
