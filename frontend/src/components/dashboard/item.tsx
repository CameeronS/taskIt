import { createDocument } from "@/api-requests/user"
import { cn } from "@/lib/utils"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  ChevronDown,
  ChevronRight,
  Edit,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface ItemProps {
  id?: number
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  label: string
  onClick: () => void
  icon: LucideIcon
  shouldHideIcon?: boolean
}

export const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  shouldHideIcon,
}: ItemProps) => {
  function handleExpand(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    event.stopPropagation()
    onExpand?.()
  }
  const ChevronIcon = expanded ? ChevronDown : ChevronRight
  const queryClient = useQueryClient()

  const { mutate: handleCreateDocument } = useMutation({
    mutationKey: ["createDocument"],
    mutationFn: () =>
      createDocument({
        title: "Untitled",
        content: "",
        icon: "",
        parentId: id,
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

  function onCreateNewPage(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault()
    event.stopPropagation()
    console.log("Create new page")
    handleCreateDocument()
  }

  return (
    <div
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      onClick={onClick}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {documentIcon ? (
        <div className=" shrink-0 mr-2 text-lg">{documentIcon}</div>
      ) : (
        <>
          <Icon
            className={cn(
              " shrink-0 h-[16px] mr-2 text-muted-foreground ",
              shouldHideIcon && "group-hover:hidden"
            )}
          />
          {!!id && (
            <div
              role="button"
              className=" h-full rounded-sm hover:bg-neutral-300 hidden group-hover:flex ml-1 mr-3"
              onClick={handleExpand}
            >
              <ChevronIcon className=" h-4 w-4 shrink-0 text-muted-foreground/50" />
            </div>
          )}
        </>
      )}

      <span className=" truncate"> {label}</span>
      {isSearch && (
        <kbd className=" ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
          <span className=" text-xs ">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className=" ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                className=" opacity-0 group-hover:opacity-100 h-full rounded-sm hover:bg-neutral-300"
                role="button"
              >
                <MoreHorizontal className=" h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className=" w-60"
              align="end"
              side="right"
              forceMount
            >
              <DropdownMenuItem>
                <Trash className=" h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className=" h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className=" text-xs text-muted-foreground p-2">
                Last edited by you
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreateNewPage}
            className=" opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 "
          >
            <Plus className=" h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}
