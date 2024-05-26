import { logIn, logOut, signUp } from "@/api-requests/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { redirect, useNavigate } from "@tanstack/react-router"

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

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] })
      navigate({ to: "/auth" })
    },
  })
}
