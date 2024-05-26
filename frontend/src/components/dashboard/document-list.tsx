import { Link, useParams } from "@tanstack/react-router"
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

  const params = useParams({
    strict: false,
    select(params: { documentsId: string }) {
      return { documentsId: params.documentsId }
    },
  })

  const onExpand = (documentId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }))
  }

  if (!documents) {
    return null
  }

  return (
    <>
      {documents &&
        documents.map((doc) => (
          <Link
            key={doc.id}
            to={"/dashboard/$documentsId"}
            params={{
              documentsId: doc.id.toString(),
            }}
          >
            <Item
              id={doc.id}
              onClick={() => {}}
              label={doc.title}
              icon={FileIcon}
              documentIcon={doc.icon!}
              level={level}
              onExpand={() => onExpand(doc.id)}
              expanded={!!expanded[doc.id]}
              shouldHideIcon={true}
              active={params.documentsId === doc.id.toString()}
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
          </Link>
        ))}
    </>
  )
}
