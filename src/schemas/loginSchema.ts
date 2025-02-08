import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1,"required"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});