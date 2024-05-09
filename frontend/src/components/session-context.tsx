import { useAuth } from "@/hooks/user"
import { User } from "@/schemas/user"
import { createContext } from "react"

interface Context {
  children: React.ReactNode
}

type AuthContext = {
  user: User | undefined | null
}

export const AuthContext = createContext<AuthContext>({
  user: undefined,
})

export const AuthProvider = ({ children }: Context) => {
  const { user } = useAuth()

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  )
}
