import vine from "@vinejs/vine";
import CustomErrorReporter from "../errorReporter/errorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const updateProfileSchema = vine.object({
  firstName: vine.string().trim().optional(),
  middleName: vine.string().trim().optional(),
  lastName: vine.string().trim().optional(),
  bio: vine.string().trim().optional(),
  profileImage: vine.string().optional(),
  designation: vine.string().optional(),
  dob: vine.string().optional(),
  phoneNumber: vine.string().optional(),
  country: vine.string().optional(),
  userId: vine.string().uuid(),
});

export default updateProfileSchema;
