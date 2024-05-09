import { userQueryOptions } from "@/hooks/user"
import { useQuery } from "@tanstack/react-query"

export const Profile = () => {
  const { data: user } = useQuery(userQueryOptions)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Profile</h3>
      <h1>{user.email}</h1>
    </div>
  )
}
