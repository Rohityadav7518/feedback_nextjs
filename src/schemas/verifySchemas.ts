import { z } from "zod"

export const verifySchema = z.object({
    code: z.string().length(6, "Verifaction Code Must Be 6 Digit")
})