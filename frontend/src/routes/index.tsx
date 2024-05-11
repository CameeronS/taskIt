import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className=" w-full flex flex-col items-center mt-20">
      <h1 className=" text-4xl mx-auto font-medium max-w-[800px] text-center">
        Collaborate, plan, and get things done with the power of{" "}
        <span className=" underline">taskIt</span>
      </h1>
      <Button className=" mt-5">Get Started</Button>
      <img src="src/assets/hero.png" height={400} width={600} alt="" />
    </div>
  )
}
