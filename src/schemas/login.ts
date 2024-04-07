import { z } from "zod";
import { passwordRegex, userNameRegex } from "./regex";

export const loginFormSchema = z.object({
  username: z.string().regex(userNameRegex, {
    message: "Username must be 6 characters",
  }),
  password: z
    .string()
    .min(8, "Please enter min 8 characters password")
    // .regex(passwordRegex, {
    //   message:
    //     "Password must be 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    // }),
});

export type LoginFormFields = z.infer<typeof loginFormSchema>;
