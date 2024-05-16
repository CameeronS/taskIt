import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { PartialBlock } from "@blocknote/core"

interface TextEditorProps {
  onChange: (value: string) => void
  initialContent?: string
}
export const TextEditor = ({ onChange, initialContent }: TextEditorProps) => {
  const content = initialContent ? JSON.parse(initialContent) : undefined

  const editor = useCreateBlockNote({
    initialContent: content as PartialBlock[] | undefined,
  })

  function handleChange() {
    onChange(JSON.stringify(editor.document, null, 2))
  }

  return <BlockNoteView editor={editor} theme="light" onChange={handleChange} />
}
