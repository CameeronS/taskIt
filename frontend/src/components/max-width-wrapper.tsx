import { cn } from "@/lib/utils"

export const MaxWidthWrapper = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) => {
  return (
    <main
      className={cn(
        "mx-auto max-w-[1750px] h-[calc(100vh-64px)] lg:px-6 xl:px-24 2xl:px-44 px-4 ",
        className
      )}
    >
      {children}
    </main>
  )
}
