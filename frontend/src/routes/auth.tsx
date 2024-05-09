import { LoginForm } from "@/components/auth/login"
import { userQueryOptions } from "@/hooks/user"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/auth")({
  component: Auth,
  beforeLoad: async ({ context, location }) => {
    const queryClient = context.queryClient
    const user = await queryClient.fetchQuery(userQueryOptions)
    if (user) {
      throw redirect({ to: "/" })
    }
  },
})

function Auth() {
  return (
    <section className=" h-full flex justify-center items-center">
      <LoginForm />
    </section>
  )
}
