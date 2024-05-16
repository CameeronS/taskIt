import { Document, documentSchema, updateDocumentSchema } from "@/schemas/user"
import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateDocumentTitle } from "@/api-requests/user"

interface DocumentTitleProps {
  documentData: z.infer<typeof documentSchema>
}
export const DocumentTitle = ({ documentData }: DocumentTitleProps) => {
  const [title, setTitle] = useState(documentData.title || "Unititled ")
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  function enableInput() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  function disableInput() {
    setIsEditing(false)
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
    mutate({
      values: {
        id: documentData.id,
        title: e.target.value,
        content: "",
        icon: "",
      },
    })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      disableInput()
    }
  }

  const { mutate } = useMutation({
    mutationKey: ["updateDocumentTitle"],
    mutationFn: updateDocumentTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserDocuments"],
      })
      queryClient.invalidateQueries({
        queryKey: ["getUserDocumentById"],
      })
    },
    onError: (error) => {
      toast.error("Failed to edit document")
      console.error(error)
    },
  })

  return (
    <div className=" flex items-center gap-x-1">
      {!!documentData.icon && <p>{documentData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          value={title}
          onKeyDown={onKeyDown}
          className=" h-7 focus-visible:ring-transparent pt-3 pl-1 border-none shadow-none text-lg"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          className=" font-normal h-auto p-1 text-lg"
        >
          <span className="truncate">{documentData.title}</span>
        </Button>
      )}
    </div>
  )
}
