import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof userSchema>
