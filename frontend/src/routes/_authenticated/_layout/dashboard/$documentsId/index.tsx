import { updateDocumentContent } from "@/api-requests/user"
import TextEditor from "@/components/dashboard/text-editior"
import { Toolbar } from "@/components/dashboard/toolbar"
import { useSaving } from "@/hooks/use-saving"
import { useUserDocumentOptionsById } from "@/hooks/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"
import { useDebounceCallback } from "usehooks-ts"

export const Route = createFileRoute(
  "/_authenticated/_layout/dashboard/$documentsId/"
)({
  component: DocumentsId,
})

function DocumentsId() {
  const { documentsId } = Route.useParams()
  const queryClient = useQueryClient()
  const { setSaving } = useSaving()

  const { data: document } = useQuery(
    useUserDocumentOptionsById(Number(documentsId))
  )

  const { mutate } = useMutation({
    mutationKey: ["updateDocumentContent"],
    mutationFn: updateDocumentContent,
    onSuccess: () => {
      setSaving(false)
      queryClient.invalidateQueries({
        queryKey: ["getUserDocumentById", Number(documentsId)],
      })
    },
    onError: (error) => {
      toast.error("Failed to edit document, please try again later")
    },
    onMutate: () => {
      setSaving(true)
    },
  })
  const debounced = useDebounceCallback(mutate, 1000)

  if (!document) {
    return null
  }

  function onChange(content: string) {
    debounced({
      values: {
        id: Number(documentsId),
        title: document?.title,
        content: content,
        icon: document?.icon,
      },
    })
  }

  return (
    <div className=" pt-20 flex-1">
      <div className=" md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <TextEditor onChange={onChange} jsonBlocks={document.content} />
      </div>
    </div>
  )
}
