import { redirect } from "@tanstack/react-router"
import axios from "axios"
import Cookies from "js-cookie"
/*type ErrorResponse = {
  error: {
    response: {
      data: string
      status: number
    }
  }
}*/
const controller = new AbortController()

const api = axios.create({
  baseURL: "/api",
})

api.interceptors.request.use(
  (config) => {
    const auth_token = Cookies.get("auth_token")
    if (auth_token) {
      config.headers["Authorization"] = `Bearer ${auth_token}`
    } else {
      console.log("No token found")

      // Cancel the request
      controller.abort()
      controller.signal.addEventListener("abort", () => {
        console.log("Request canceled")
      })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refresh_token = Cookies.get("refresh_token")

    if (!refresh_token) {
      return Promise.reject(error)
    }

    if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await axios.post("/api/auth/refreshToken", {
          token: refresh_token,
        })

        console.log("Token succsesfully refreshed")
        const newToken = Cookies.get("auth_token")

        console.log("Retrying original request")
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axios(originalRequest)
      } catch (error) {
        console.log("Logging out")
        Cookies.remove("auth_token")
        Cookies.remove("refresh_token")
        return redirect({ to: "/auth" })
      }
    }

    return Promise.reject(error)
  }
)

export default api
