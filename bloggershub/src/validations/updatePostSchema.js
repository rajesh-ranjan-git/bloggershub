import { z } from "zod";

export const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.string().optional(),
});
