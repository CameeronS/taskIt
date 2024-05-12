import { Sidebar } from "@/components/sidebar"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/_layout")({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className=" flex mx-auto max-w-[1750px] h-screen w-full">
      <Sidebar />
      <Outlet />
    </div>
  )
}
