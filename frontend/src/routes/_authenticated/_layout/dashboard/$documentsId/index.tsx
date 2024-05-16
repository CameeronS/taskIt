import { updateDocumentContent } from "@/api-requests/user"
import { TextEditor } from "@/components/dashboard/text-editior"
import { useUserDocumentOptionsById } from "@/hooks/user"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { toast } from "sonner"
export const Route = createFileRoute(
  "/_authenticated/_layout/dashboard/$documentsId/"
)({
  component: DocumentsId,
  loader: async ({ params, context }) => {
    const queryClient = context.queryClient
    const document = await queryClient.fetchQuery(
      useUserDocumentOptionsById(Number(params.documentsId))
    )
    if (!document) {
      throw redirect({ to: "/dashboard" })
    }

    return { document }
  },
})

function DocumentsId() {
  const { documentsId } = Route.useParams()
  const { document } = Route.useLoaderData()
  const { queryClient } = Route.useRouteContext()

  const { mutate } = useMutation({
    mutationKey: ["updateDocumentContent"],
    mutationFn: updateDocumentContent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserDocumentById", Number(documentsId)],
      })
    },
    onError: (error) => {
      toast.error("Failed to edit document")
      console.error(error)
    },
  })

  function onChange(content: string) {
    mutate({
      values: {
        id: Number(documentsId),
        title: document.title,
        content: content,
        icon: "",
      },
    })
  }

  return (
    <div className=" pt-20 flex-1">
      <div className=" md:max-w-3xl lg:max-w-4xl mx-auto">
        <TextEditor onChange={onChange} initialContent={document?.content} />
      </div>
    </div>
  )
}
