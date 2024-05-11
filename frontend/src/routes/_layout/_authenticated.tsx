import { userQueryOptions } from "@/hooks/user"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    const user = await queryClient.fetchQuery(userQueryOptions)
    if (!user) {
      throw redirect({ to: "/auth" })
    }
  },

  component: Component,
})

function Component() {
  return <Outlet />
}
