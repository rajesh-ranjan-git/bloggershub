import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  designation: z.string().optional(),
  dob: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number")
    .or(z.literal("")) // Allows an empty string
    .optional(),
  bio: z.string().optional(),
});
