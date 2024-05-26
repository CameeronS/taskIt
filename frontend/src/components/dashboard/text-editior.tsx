import { BlockNoteView } from "@blocknote/mantine"
import { useEffect, useMemo, useState } from "react"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import "@blocknote/mantine/style.css"
import "../../globals.css"

interface TextEditorProps {
  onChange: (value: string) => void
  jsonBlocks: string
}
const TextEditor = ({ onChange, jsonBlocks }: TextEditorProps) => {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading")

  const loadData = async () => {
    return jsonBlocks ? (JSON.parse(jsonBlocks) as PartialBlock[]) : undefined
  }

  useEffect(() => {
    loadData().then((data) => {
      setInitialContent(data)
    })
  }, [jsonBlocks])

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined
    }
    return BlockNoteEditor.create({ initialContent })
  }, [initialContent])

  if (editor === undefined) {
    return "Loading content..."
  }

  const handleChange = () => {
    onChange(JSON.stringify(editor.document, null, 2))
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={handleChange}
      theme="light"
      data-theming-css-variables-demo
    />
  )
}

export default TextEditor
