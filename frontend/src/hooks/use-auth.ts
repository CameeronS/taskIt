import { logIn, signUp } from "@/api-requests/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate({ to: "/dashboard" })
      queryClient.invalidateQueries({ queryKey: ["getUser"] })
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate({ to: "/dashboard" })
      queryClient.invalidateQueries({ queryKey: ["getUser"] })
    },
  })
}
