import { loginSchema, registerSchema } from "@/schemas/auth"
import { z } from "zod"
import axios from "axios"

type ErrorResponse = {
  response: {
    data: string
    status: number
  }
}

type JSONResponse = {
  token?: string
  refreshToken?: string
}

export async function logIn(values: z.infer<typeof loginSchema>) {
  try {
    const response = await axios.post("/api/auth/login", values)

    const { token, refreshToken } = response.data as JSONResponse

    return { token, refreshToken }
  } catch (error) {
    const errorResponse = error as ErrorResponse
    throw new Error(errorResponse.response.data)
  }
}

export async function signUp(values: z.infer<typeof registerSchema>) {
  try {
    const response = await axios.post("/api/auth/register", values)

    const { token, refreshToken } = response.data as JSONResponse

    return { token, refreshToken }
  } catch (error) {
    const errorResponse = error as ErrorResponse
    throw new Error(errorResponse.response.data)
  }
}

export async function logOut() {
  try {
    await axios.post("/api/auth/logout")
  } catch (error) {
    console.error(error)
  }
}
