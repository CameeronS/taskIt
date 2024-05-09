import api from "@/lib/api-interceptor"
import { User } from "@/schemas/user"

export const getUser = async () => {
  const token = localStorage.getItem("authToken")
  if (!token) {
    return null
  }
  const res = await api.get("/user/me")
  const data = res.data as User
  return data
}
