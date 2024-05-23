import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useEffect, useMemo, useState } from "react"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"

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
      console.log(data)
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

  return <BlockNoteView editor={editor} onChange={handleChange} theme="light" />
}

export default TextEditor
