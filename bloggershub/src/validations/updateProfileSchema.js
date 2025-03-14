import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  designation: z.string().optional(),
  dob: z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
});
