import { logIn } from "@/api-requests/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      navigate({ to: "/dashboard" })
      queryClient.invalidateQueries({ queryKey: ["getUser"] })
    },
  })
}
