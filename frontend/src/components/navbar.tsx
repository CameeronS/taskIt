import { Fragment } from "react"
import { Button } from "./ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import { navItems } from "@/lib/items"
import { userQueryOptions } from "@/hooks/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Logo } from "./logo"

export const Navbar = () => {
  const { data: user } = useQuery(userQueryOptions)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  function handleLogout() {
    const authToken = localStorage.getItem("authToken")
    const refreshToken = localStorage.getItem("refreshToken")
    if (authToken) localStorage.removeItem("authToken")
    if (refreshToken) localStorage.removeItem("refreshToken")
    queryClient.invalidateQueries({ queryKey: ["getUser"] })
    navigate({ to: "/auth" })
  }

  return (
    <header className=" sticky top-0 z-[1000]  h-16 py-2">
      <nav className="  mx-auto flex  items-center justify-between bg-background ">
        <div className=" flex gap-2 items-center">
          <Logo />
          <span className=" font-medium text-xl">.taskIt</span>
        </div>

        <ul className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            if (item.name === "Get Started")
              return (
                <Button key={item.id} className=" ml-5 font-normal">
                  {item.name}
                </Button>
              )
            if (item.name === "Log In" && user)
              return (
                <Button
                  onClick={handleLogout}
                  className=" font-normal"
                  key={1223}
                  variant={"ghost"}
                >
                  Log Out
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
