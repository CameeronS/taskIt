import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Navbar } from "@/components/navbar"
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <MaxWidthWrapper>
      <Navbar />
      <Outlet />
    </MaxWidthWrapper>
  ),
})
