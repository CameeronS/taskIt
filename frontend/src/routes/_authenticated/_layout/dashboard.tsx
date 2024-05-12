import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"
import { PlusCircleIcon } from "lucide-react"

export const Route = createFileRoute("/_authenticated/_layout/dashboard")({
  component: Dashboard,
})

function Dashboard() {
  const { user } = Route.useRouteContext()

  return (
    <div className=" flex flex-col items-center justify-center h-full w-full gap-4 ">
      <img
        height={300}
        width={300}
        src="src/assets/emptydashboard.png"
        alt="Empty Workspace"
      />

      <h2 className=" text-lg font-medium text-center">
        Welcome{" "}
        {user.firstName
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))}{" "}
        to TaskIt
      </h2>

      <Button className=" font-medium">
        <PlusCircleIcon className="w-6 h-6 mr-2" />
        Create a Task
      </Button>
    </div>
  )
}
