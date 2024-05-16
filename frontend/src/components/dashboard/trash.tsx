import { deleteDocument, restoreDocument } from "@/api-requests/user"
import { useUserArchivedDocumentsOptions } from "@/hooks/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, Search, Trash, Undo, X } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import { Input } from "../ui/input"

export const TrashBox = () => {
  const { data: trash } = useQuery(useUserArchivedDocumentsOptions)
  const queryClient = useQueryClient()

  const [search, setSearch] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  const filteredTrash = trash?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase())
  })

  const { mutate: handleRestoreDocument } = useMutation({
    mutationKey: ["archiveDocument"],
    mutationFn: (id: number) => restoreDocument(id),
    onSuccess: () => {
      toast.success("Document restored")
      queryClient.invalidateQueries({ queryKey: ["getUserDocuments"] })
      queryClient.invalidateQueries({ queryKey: ["getUserArchivedDocuments"] })
    },
    onError: (error) => {
      toast.error("Failed to restore document")
      console.error(error)
    },
  })

  const { mutate: handlePermenantDelete } = useMutation({
    mutationKey: ["deleteDocument"],
    mutationFn: (id: number) => deleteDocument(id),
    onSuccess: () => {
      toast.success("Document deleted")
      queryClient.invalidateQueries({ queryKey: ["getUserArchivedDocuments"] })
    },
    onError: (error) => {
      toast.error("Failed to delete document")
      console.error(error)
    },
  })

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation()
    handleRestoreDocument(id)
  }

  const handleConfirmDelete = (id: number) => {
    handlePermenantDelete(id)
  }

  return (
    <div className=" text-sm">
      <div className=" flex items-center gap-x-1 ">
        <Search className=" w-5 h-5" />
        <Input
          placeholder="Search"
          className=" h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className=" mt-2 px-1 pb-1">
        <p className=" hidden last:block text-xs text-center text-muted-foreground">
          No documents in trash
        </p>
        {filteredTrash?.map((doc) => (
          <div
            key={doc.id}
            role="button"
            onClick={() => {}}
            className=" text-sm rounded-sm hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className=" truncate pl-2">{doc.title}</span>
            {!confirmDelete || confirmDelete !== doc.id ? (
              <div className=" flex items-center ">
                <div
                  role="button"
                  onClick={(e) => onRestore(e, doc.id)}
                  className=" rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Undo className=" w-4 h-4 text-muted-foreground" />
                </div>
                <div
                  onClick={() => setConfirmDelete(doc.id)}
                  role="button"
                  className=" rounded-sm hover:bg-neutral-200 p-2"
                >
                  <Trash className=" w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className=" flex items-center ">
                <div
                  role="button"
                  onClick={() => setConfirmDelete(null)}
                  className=" rounded-sm p-2 hover:bg-neutral-200"
                >
                  <X className=" w-4 h-4 text-red-400" />
                </div>
                <div
                  onClick={() => handleConfirmDelete(doc.id)}
                  role="button"
                  className=" rounded-sm hover:bg-neutral-200 p-2"
                >
                  <Check className=" w-4 h-4 text-emerald-400" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
