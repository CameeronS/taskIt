import { getUser } from "@/api-requests/user"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  })
  return { user }
}
