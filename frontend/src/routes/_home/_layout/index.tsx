import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { userQueryOptions } from "@/hooks/user"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_home/_layout/")({
  component: Index,
})

function Index() {
  const { data: user } = useQuery(userQueryOptions)

  const navigate = useNavigate()
  return (
    <div className=" w-full flex flex-col items-center mt-4">
      <h1 className=" text-5xl mx-auto font-medium max-w-[800px] text-center">
        A tiny{" "}
        <span className=" whitespace-nowrap">
          {" "}
          n
          <span className=" relative text-transparent ">
            o
            <span className=" absolute inset-x-0 z-[9999] top-5">
              <Logo />
            </span>
          </span>
          te
        </span>{" "}
        taking app
      </h1>
      <p className=" max-w-[360px] text-center mt-4 text-lg">
        Simple, fast, use <span className="underline">taskit</span> to
        collaborate, plan, and get things done{" "}
      </p>
      <Button
        onClick={() => {
          if (user) {
            navigate({ to: "/dashboard" })
          } else {
            navigate({ to: "/auth" })
          }
        }}
        className=" mt-5 font-normal"
      >
        Create a note
      </Button>
      <div className=" rounded-md p-2  flex justify-center mt-7 shadow-2xl shadow-black/50 drop-shadow-2xl">
        <img src="src/assets/stickman.png" height={350} width={350} alt="" />
      </div>
    </div>
  )
}
