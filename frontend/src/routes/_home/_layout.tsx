import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Navbar } from "@/components/navbar"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_home/_layout")({
  component: () => (
    <MaxWidthWrapper>
      <Navbar />
      <Outlet />
    </MaxWidthWrapper>
  ),
})
