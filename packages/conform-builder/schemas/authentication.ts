import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, { message: "Password is required" }),
});

export const RefreshSchema = z.object({
  refreshToken: z.string(),
});
