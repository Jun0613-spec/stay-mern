import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Spinner from "@/components/spinner";
import Button from "@/components/button";

import { RegisterFormData, UserRole } from "@/types";

import { useRegister } from "@/hooks/auth/use-register";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.Customer
    }
  });

  const onSubmit = (values: RegisterFormData) => {
    registerUser(values);
  };

  return (
    <div className="flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full p-6 rounded-lg border dark:border-neutral-600">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required"
                })}
                type="text"
                placeholder="Enter your first name"
                className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="Enter your last name"
                className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
            />
            {errors.email && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-6 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-6 w-6 text-neutral-600 cursor-pointer" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-neutral-600 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match"
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-6 transform -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-6 w-6 text-neutral-600 cursor-pointer" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-neutral-600 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Account Type
            </label>
            <div className="relative">
              <select
                {...register("role")}
                className="appearance-none mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:focus:ring-neutral-400 pl-3 pr-10"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="BUSINESS">Business</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <MdOutlineKeyboardArrowDown size={24} />
              </div>
            </div>
            {errors.role && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.role?.message}
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
              "Register"
            )}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-neutral-500 dark:text-neutral-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-800 dark:text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
