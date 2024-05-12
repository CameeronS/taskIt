import { userQueryOptions } from "@/hooks/user"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    const user = await queryClient.fetchQuery(userQueryOptions)
    if (!user) {
      throw redirect({ to: "/auth" })
    }
    return { user }
  },

  component: Component,
})

function Component() {
  return <Outlet />
}
