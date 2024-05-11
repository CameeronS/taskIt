import { Sidebar } from "@/components/sidebar"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}
