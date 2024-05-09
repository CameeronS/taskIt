import { Fragment } from "react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
import { navItems } from "@/lib/items"
import { useAuth } from "@/hooks/user"

export const Navbar = () => {
  const { user } = useAuth()

  return (
    <header className=" sticky top-0 z-[1000]  h-16 py-2">
      <nav className="  mx-auto flex  items-center justify-between bg-background ">
        <div className=" flex gap-2 items-center">
          <span>Logo</span>
          <span className=" font-medium">TaskIt</span>
        </div>

        <ul className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            if (item.name === "Test TaskIt")
              return (
                <Button key={item.id} className=" ml-5">
                  {item.name}
                </Button>
              )
            if (item.name === "Log In" && user)
              return (
                <Button key={1223} variant={"ghost"}>
                  Log Out
                </Button>
              )

            return (
              <Fragment key={item.id}>
                <li>
                  <Button variant={"ghost"}>
                    <Link className=" text-black" to={item.link}>
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
