import { useAuth } from "@/hooks/user"

export const Profile = () => {
  const { user } = useAuth()

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
