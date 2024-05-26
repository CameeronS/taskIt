import { cn } from "@/lib/utils"

export const MaxWidthWrapper = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) => {
  return (
    <div className="  p-4 bg-[#fbf7f4]  drop-shadow-2xl h-screen">
      <main
        className={cn(
          "mx-auto max-w-[1750px] h-full  xl:px-24 2xl:px-44 px-4  p-3  bg-background",
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
