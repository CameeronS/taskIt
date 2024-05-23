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
import { useRegister } from "@/hooks/use-auth"
import { Link } from "@tanstack/react-router"
import { registerSchema } from "@/schemas/auth"

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate, error, isPending } = useRegister()

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutate(values)
    console.log(values)
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create an account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="grid ">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormDescription>Enter your email</FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormDescription>Enter your password</FormDescription>
                    <FormItem>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormDescription>Confirm your password</FormDescription>
                    <FormItem>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              {error && <FormMessage>{error.message}</FormMessage>}
              <Button
                disabled={form.formState.isSubmitting || isPending}
                type="submit"
                className="w-full"
              >
                Login
                {isPending && " ..."}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  lg:block">
        <img
          src="/src/assets/emptydashboard.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
