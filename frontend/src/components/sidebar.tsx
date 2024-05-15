import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react"
import React, { ElementRef, useEffect, useRef, useState } from "react"
import { UserItems } from "./dashboard/user-items"
import { Item } from "./dashboard/item"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDocument } from "@/api-requests/user"
import { toast } from "sonner"
import { useUserDocumentsOptions } from "@/hooks/user"
import { DocumentList } from "./dashboard/document-list"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { TrashBox } from "./dashboard/trash"
export function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const resizeRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isMobile) {
      collapseSidebar()
    } else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {}, [])

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault()
    event.stopPropagation()

    resizeRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  function handleMouseMove(event: MouseEvent) {
    if (!resizeRef.current) return
    let newWidth = event.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  function handleMouseUp() {
    resizeRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  function resetWidth() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      )
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  function collapseSidebar() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      navbarRef.current.style.setProperty("left", "0")
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const { mutate: handleCreateDocument } = useMutation({
    mutationKey: ["createDocument"],
    mutationFn: () =>
      createDocument({
        title: "Untitled",
        content: "",
        icon: "",
      }),
    onSuccess: () => {
      toast.success("Document created")
      queryClient.invalidateQueries({ queryKey: ["getUserDocuments"] })
    },
    onError: (error) => {
      toast.error("Failed to create document")
      console.error(error)
    },
  })

  const { data: documents } = useQuery(useUserDocumentsOptions)

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[1000]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapseSidebar}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>

        <div>
          <UserItems />
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />

          <Item label="Settings" icon={Settings} onClick={() => {}} />

          <Item
            onClick={handleCreateDocument}
            label="New Page"
            icon={PlusCircle}
          />
        </div>
        <div className=" mt-4">
          <DocumentList documents={documents!} />

          {/*TODO: Add popover trash */}
          <Popover>
            <PopoverTrigger className=" w-full mt-4">
              <Item label="Trash" icon={Trash} onClick={() => {}} />
            </PopoverTrigger>
            <PopoverContent side="right">
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className=" opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          " absolute left-60 w-[calc(100%-240px)] z-[1000]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className=" h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  )
}
