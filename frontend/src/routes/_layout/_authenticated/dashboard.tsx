import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_authenticated/dashboard")({
  component: () => <div>Dashboard</div>,
})
