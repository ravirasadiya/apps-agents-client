import { z } from "zod";
import { passwordRegex, userNameRegex } from "./regex";

export const registerFormSchema = z
  .object({
    username: z.string().regex(userNameRegex, {
      message: "Username must be 6 characters",
    }),
    password: z
      .string()
      .min(8, "Please enter min 8 characters password")
      .regex(passwordRegex, {
        message:
          "Password must be 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormFields = z.infer<typeof registerFormSchema>;
