import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password is too short" }),
})

export const LoginForm = () => {
  const [data, setData] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function register(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    const data = await response.json()

    return data
  }

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      alert("Registration successful!")
      console.log(data)
      const token = JSON.stringify(data) as string
      setData(token)
    },
    onError: (error) => {
      alert("Registration failed!")
      console.error(error)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
    console.log(values)
  }

  return (
    <div className=" w-1/2 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className=" mt-10" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <p className=" mt-5   whitespace-pre-wrap break-words break-all">
        {data}
      </p>
    </div>
  )
}
