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
import { useState } from "react"
import { loginSchema } from "@/schemas/auth"
import { useLogin } from "@/hooks/use-auth"

export const LoginForm = () => {
  const [data, setData] = useState<string>()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate, error } = useLogin()

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values)
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
          {error && <FormMessage>{error.message}</FormMessage>}

          <Button
            disabled={form.formState.isSubmitting}
            className=" mt-10"
            type="submit"
          >
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
