import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import Spinner from "@/components/spinner";

import { loginSchema } from "@/lib/schemas";

import { useLogin } from "@/hooks/auth/use-login";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login(values);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className=" max-w-lg w-full p-8 rounded-lg border dark:border-neutral-600">
        <h2 className="text-xl md:text-2xl font-bold text-center  mb-8">
          Login
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="cursor-pointer text-gray-600" />
                        ) : (
                          <EyeIcon className="cursor-pointer text-gray-600" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900 transition duration-200"
              size="lg"
            >
              {isPending ? <Spinner /> : "Continue"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-neutral-500 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-800 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
