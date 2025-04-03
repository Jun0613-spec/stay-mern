import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Spinner from "@/components/spinner";
import Button from "@/components/button";

import { useLogin } from "@/hooks/auth/use-login";

import { LoginFormData } from "@/types";
import GoogleLoginButton from "@/components/layout/google-login-button";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: LoginFormData) => {
    login(values);
  };

  return (
    <div className=" flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full p-8 rounded-lg border dark:border-neutral-600">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
            />
            {errors.email && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-6 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-300 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isPending}
            className="w-full mt-6"
          >
            {isPending ? (
              <Spinner className="size-6" iconClassName="text-white" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600" />
          <span className="px-4 text-neutral-500 dark:text-neutral-400">
            Or
          </span>
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600" />
        </div>

        {/* Google Login Button */}
        <div className="mt-4 w-full">
          <GoogleLoginButton />
        </div>

        <div className="text-center mt-4">
          <p className="text-neutral-500 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-800 dark:text-indigo-600 font-medium hover:underline"
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
