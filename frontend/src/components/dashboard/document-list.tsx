import { redirect } from "@tanstack/react-router"
import { FileIcon } from "lucide-react"
import { useState } from "react"
import { Item } from "./item"
import { Document } from "@/schemas/user"

interface DocumentListProps {
  level?: number
  documents: Document[]
}

export const DocumentList = ({ level = 0, documents }: DocumentListProps) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const onExpand = (documentId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }))
  }

  const onRedirect = (documentId: number) => {
    redirect({ to: `/document/${documentId}` })
  }

  if (!documents) {
    return null
  }

  return (
    <>
      {documents &&
        documents.map((doc) => (
          <div key={doc.id}>
            <Item
              id={doc.id}
              onClick={() => onRedirect(doc.id)}
              label={doc.title}
              icon={FileIcon}
              documentIcon={doc.icon!}
              level={level}
              onExpand={() => onExpand(doc.id)}
              expanded={!!expanded[doc.id]}
              shouldHideIcon={true}
            />

            {expanded[doc.id] && doc.children.length === 0 && (
              <p
                style={{
                  paddingLeft: `${(level + 1) * 12 + 25}px`,
                }}
                className="text-sm font-medium text-muted-foreground/80"
              >
                No pages inside
              </p>
            )}

            {expanded[doc.id] && doc.children && (
              <DocumentList level={level + 1} documents={doc.children} />
            )}
          </div>
        ))}
    </>
  )
}
