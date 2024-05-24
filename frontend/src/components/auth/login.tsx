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
import { loginSchema } from "@/schemas/auth"
import { useLogin } from "@/hooks/use-auth"
import EmptyDashboard from "@/assets/emptydashboard.png"
import { Link } from "@tanstack/react-router"

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate, error, isPending } = useLogin()

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values)
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter your email</FormDescription>
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormItem>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>Enter your password</FormDescription>
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
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  lg:block">
        <img
          src={EmptyDashboard}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

{
  /**
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
            disabled={form.formState.isSubmitting || isPending}
            className=" mt-10"
            type="submit"
          >
            Log In
            {isPending && " ..."}
          </Button>
        </form>
      </Form>
    </div>

*/
}
