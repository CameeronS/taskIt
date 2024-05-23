import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import EmojiPicker, { Theme } from "emoji-picker-react"
interface IconPickerProps {
  onChange: (icon: string) => void
  children: React.ReactNode
  asChild?: boolean
}

export const IconPicker = ({
  onChange,
  children,
  asChild,
}: IconPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className=" p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  )
}
