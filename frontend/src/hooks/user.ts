import { getUser } from "@/api-requests/user"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const useAuth = () => {
  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  })
  return { user }
}

export const userQueryOptions = queryOptions({
  queryKey: ["getUser"],
  queryFn: getUser,
  staleTime: Infinity,
})
