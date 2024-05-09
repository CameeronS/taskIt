import { logIn } from "@/api-requests/auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      const { token, refreshToken } = data
      if (token) localStorage.setItem("authToken", token)
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken)
      navigate({ to: "/about" })
    },
  })
}
