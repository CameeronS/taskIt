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

/*
export const AuthProvider = ({ children }: Context) => {
  const { data: userData } = useUser()

  return (
    <AuthContext.Provider value={{ user: userData }}>
      {children}
    </AuthContext.Provider>
  )
}*/
