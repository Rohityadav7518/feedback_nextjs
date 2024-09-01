import { z } from "zod"

export const usernameValidation = z.
    string()
    .min(5)
    .max(10)
    .regex(/^[a-zA-Z0-9_]+$/, "No Contain Special Character")

export const signUpSchema = z.object({
    username: usernameValidation,
    eamil: z.string().email({ message: "Invalid Address " }),
    password: z.string().min(6, { message: "Password Must Be Atleast 6 Charcter" })
})