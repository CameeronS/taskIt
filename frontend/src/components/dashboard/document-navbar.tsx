import { useUserDocumentOptionsById } from "@/hooks/user"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { MenuIcon } from "lucide-react"
import { DocumentTitle } from "./document-title"

interface DocumentNavbarProps {
  isCollapsed: boolean
  onResetWidth: () => void
}

export const DocumentNavbar = ({
  isCollapsed,
  onResetWidth,
}: DocumentNavbarProps) => {
  const params = useParams({
    strict: false,
    select(params: { documentsId: string }) {
      return { documentsId: params.documentsId }
    },
  })

  const { data: document } = useQuery(
    useUserDocumentOptionsById(Number(params.documentsId))
  )

  if (!document) return null

  return (
    <>
      <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className=" h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <DocumentTitle documentData={document} />
        </div>
      </nav>
    </>
  )
}
