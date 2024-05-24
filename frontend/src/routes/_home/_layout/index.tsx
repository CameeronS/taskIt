import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"
import Screen from "@/assets/screen.png"
export const Route = createFileRoute("/_home/_layout/")({
  component: Index,
})

function Index() {
  return (
    <div className=" w-full flex flex-col items-center mt-14">
      <h1 className=" text-5xl mx-auto font-medium max-w-[800px] text-center">
        A tiny note taking app
      </h1>
      <p className=" max-w-[350px] text-center mt-2 text-lg">
        Simple, fast, use <span className="underline">taskit</span> to
        collaborate, plan, and get things done{" "}
      </p>
      <Button className=" mt-5 font-normal">Create a note</Button>
      <div className=" rounded-md p-2 bg-gray-200 flex justify-center mt-7 shadow-2xl shadow-black/50 drop-shadow-2xl">
        <img src={Screen} height={400} width={600} alt="" />
      </div>
    </div>
  )
}
