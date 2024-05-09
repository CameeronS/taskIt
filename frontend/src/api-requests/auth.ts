import { loginSchema } from "@/schemas/auth"
import { z } from "zod"

type JSONResponse = {
  token?: string
  refreshToken?: string
  errors?: Array<{ message: string }>
}

export async function logIn(values: z.infer<typeof loginSchema>) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
  const { token, errors, refreshToken }: JSONResponse = await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }

  return {
    token,
    refreshToken,
  }
}
