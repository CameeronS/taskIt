import { documentSchema } from "@/schemas/user"
import { z } from "zod"
import { IconPicker } from "./emoji-picker"
import { Smile, X } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateDocumentTitle } from "@/api-requests/user"
import { toast } from "sonner"
import { ElementRef, useRef, useState } from "react"
import TextAreaAutoSize from "react-textarea-autosize"
import { useUserDocumentOptionsById } from "@/hooks/user"
import { useParams } from "@tanstack/react-router"

interface ToolbarProps {
  initialData: z.infer<typeof documentSchema>
  preview?: boolean
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const queryClient = useQueryClient()
  const inputRef = useRef<ElementRef<"textarea">>(null)
  const params = useParams({
    strict: false,
    select(params: { documentsId: string }) {
      return { documentsId: params.documentsId }
    },
  })
  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState(initialData?.title)

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateDocument"],
    mutationFn: updateDocumentTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserDocuments"],
      })
      queryClient.invalidateQueries({
        queryKey: ["getUserDocumentById", Number(params.documentsId)],
      })
    },
    onError: (error) => {
      toast.error("Failed to edit document")
      console.error(error)
    },
  })
  const onIconChange = (icon: string) => {
    mutate({
      values: {
        id: initialData.id,
        title: initialData.title,
        content: initialData.content,
        icon,
      },
    })
  }

  const onIconRemove = () => {
    mutate({
      values: {
        id: initialData.id,
        title: initialData.title,
        content: initialData.content,
        icon: "",
      },
    })
  }

  const enableInput = () => {
    if (preview) return
    setIsEditing(true)
    setTimeout(() => {
      setTitle(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = () => setIsEditing(false)

  const onInput = (value: string) => {
    setTitle(value)
    mutate({
      values: {
        id: initialData.id,
        title: value,
        content: initialData.content,
        icon: initialData.icon,
      },
    })
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      disableInput()
    }
  }

  return (
    <div className=" pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className=" flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconChange}>
            <p className=" text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onIconRemove}
            variant={"outline"}
            size={"icon"}
            className="  rounded-xl opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs w-fit h-fit p-1"
          >
            <X className=" h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className=" text-6xl pt-6">{initialData.icon}</p>
      )}
      <div>
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconChange}>
            <Button
              className=" text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className=" h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyPress}
          value={title}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#1a1a1a] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11px] text-5xl font-bold break-words outline-none  "
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}
