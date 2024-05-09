import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Navbar } from "@/components/navbar"
import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <MaxWidthWrapper>
      <Navbar />
      <Outlet />
    </MaxWidthWrapper>
  ),
})
