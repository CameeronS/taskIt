import { redirect } from "@tanstack/react-router"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
const api = axios.create({
  baseURL: "/api",
})

interface RetryQueueItem {
  resolve: (value?: any) => void
  reject: (error?: any) => void
  config: AxiosRequestConfig
}

async function refreshAuthToken() {
  const refresh_token = Cookies.get("refresh_token")
  await axios.post("/api/auth/refreshToken", {
    token: refresh_token,
  })
}

const refreshAndRetryQueue: RetryQueueItem[] = []

let isRefreshing = false

api.interceptors.request.use(
  (config) => {
    const auth_token = Cookies.get("auth_token")
    if (auth_token) {
      config.headers["Authorization"] = `Bearer ${auth_token}`
    } else {
      throw redirect({ to: "/auth" })
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
    const err = error as AxiosError

    const originalRequest: AxiosRequestConfig = error.config

    try {
      if (err.response?.status === 400) {
        if (error.response.data === "Document not found") {
          throw redirect({ to: "/dashboard" })
        }
      }

      if (err.response?.status === 401 && err.response.data === "JWT Error") {
        // Refresh the auth token
        await refreshAuthToken()

        console.log("Token succsesfully refreshed")

        refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
          api
            .request(config)
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        })

        refreshAndRetryQueue.length = 0

        console.log("Retrying original request")
        return api(originalRequest)
      }
    } catch (error) {
      const err = error as AxiosError
      if (
        err.response?.status === 401 &&
        err.response.data === "Invalid refresh token"
      ) {
        console.log("Invalid refresh token")
        console.log("Redirecting to /auth")
        Cookies.remove("auth_token")
        Cookies.remove("refresh_token")
        throw redirect({ to: "/auth" })
      }
    }

    return Promise.reject(error)
  }
)

export default api
