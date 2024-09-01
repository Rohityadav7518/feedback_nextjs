import { z } from "zod"

export const acceptMassageSchema = z.object({
    acceptMassages: z.boolean()
})