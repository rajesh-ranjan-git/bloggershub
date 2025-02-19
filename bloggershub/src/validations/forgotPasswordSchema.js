import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .max(20, {
        message: "Password must not be more than 20 characters.",
      }),
    password_confirmation: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .max(20, {
        message: "Password must not be more than 20 characters.",
      }),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["password_confirmation"],
      });
    }
  });
