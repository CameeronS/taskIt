import { Fragment } from "react"
import { Button } from "./ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import { navItems } from "@/lib/items"
import { userQueryOptions } from "@/hooks/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Icons } from "./icons"
import { useLogout } from "@/hooks/use-auth"

export const Navbar = () => {
  const { data: user } = useQuery(userQueryOptions)
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { mutate: handleLogOut, isPending } = useLogout()

  return (
    <header className=" sticky top-0 z-[1000]  h-16 py-2 px-24">
      <nav className="  mx-auto flex  items-center justify-between bg-background ">
        <div className=" flex gap-2 items-center">
          <span className=" font-medium text-xl">.taskIt</span>
        </div>

        <ul className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            if (item.name === "Create a note")
              return (
                <Button
                  size={"sm"}
                  onClick={() => {
                    if (user) {
                      navigate({ to: "/dashboard" })
                    } else {
                      navigate({ to: "/auth" })
                    }
                  }}
                  key={item.id}
                  className=" ml-5 font-normal"
                >
                  {item.name}
                </Button>
              )

            if (item.name === "Log In" && user)
              return (
                <Button
                  key={item.id}
                  disabled={isPending}
                  onClick={() => {
                    handleLogOut()
                  }}
                  className=" font-normal"
                  variant={"ghost"}
                >
                  Log Out
                </Button>
              )

            if (item.name === "Icon1")
              return (
                <Button
                  key={item.id}
                  className=" font-normal p-2 rounded-full"
                  variant={"ghost"}
                  size={"icon"}
                >
                  <Icons.x className=" w-6 h-6" />
                </Button>
              )
            if (item.name === "Icon2")
              return (
                <Button
                  key={item.id}
                  className=" font-normal p-2 rounded-full"
                  variant={"ghost"}
                  size={"icon"}
                >
                  <Icons.linkedIn className=" w-6 h-6" />
                </Button>
              )

            return (
              <Fragment key={item.id}>
                <li>
                  <Button variant={"ghost"}>
                    <Link className=" text-black font-normal" to={item.link}>
                      {item.name}
                    </Link>
                  </Button>
                </li>
                {item.id === 1 && <span>|</span>}
              </Fragment>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
