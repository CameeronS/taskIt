import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userQueryOptions } from "@/hooks/user"
import { useQuery } from "@tanstack/react-query"

import { ChevronsLeftRightIcon } from "lucide-react"
import { Button } from "../ui/button"

export const UserItems = () => {
  const { data: user } = useQuery(userQueryOptions)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className=" flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className=" gap-x-2 flex items-center max-w-[120px] ">
            <div className=" h-6 w-6 bg-black rounded-md text-white flex justify-center items-center shrink-0 ">
              {user?.firstName.charAt(0).toUpperCase()}
            </div>
            <span className=" text-start truncate font-medium">
              {user?.firstName
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))}{" "}
              TaskIt board
            </span>
          </div>
          <ChevronsLeftRightIcon className="w-4 h-4  rotate-90 ml-2 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className=" flex flex-col space-y-4 p-2 ">
          <p className=" text-xs font-medium leading-none text-muted-foreground ">
            {user?.email}
          </p>
          <div className=" flex items-center gap-x-2">
            <div className=" space-y-1">
              <p className=" text-sm line-clamp-1">
                {user?.fullName
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
                's TaskIt board
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" w-full text-muted-foreground h-8">
          <Button
            className=" p-0 w-full justify-start hover:no-underline text-muted-foreground hover:text-primary "
            variant={"link"}
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
