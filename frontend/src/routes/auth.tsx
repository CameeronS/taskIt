import { LoginForm } from "@/components/auth/login"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth")({
  component: Auth,
})

function Auth() {
  return (
    <section className=" h-full flex justify-center items-center">
      <LoginForm />
    </section>
  )
}
