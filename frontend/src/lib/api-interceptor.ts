import axios from "axios"
/*type ErrorResponse = {
  error: {
    response: {
      data: string
      status: number
    }
  }
}*/

const api = axios.create({
  baseURL: "/api",
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        console.log("Refreshing token")
        const currentRefreshToken = localStorage.getItem("refreshToken")
        const response = await axios.post("/api/auth/refreshToken", {
          token: currentRefreshToken,
        })
        const { token, refreshToken } = response.data
        const currentToken = localStorage.getItem("authToken")

        currentToken && localStorage.setItem("authToken", token)
        refreshToken && localStorage.setItem("refreshToken", refreshToken)
        console.log("Token refreshed")

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axios(originalRequest)
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error)
  }
)

export default api
