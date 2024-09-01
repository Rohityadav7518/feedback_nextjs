import { z } from "zod"

export const MassageSchema = z.object({
    content: z.string()
        .min(10, { message: "It Should be Alteast 10 word" })
        .max(300, { message: "It Should be no longer than 300 word" })
})