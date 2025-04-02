import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const defaultStyles =
    "rounded-md font-light transition duration-200 flex items-center justify-center cursor-pointer";
  const variantStyles = {
    primary:
      "bg-indigo-600 dark:bg-indigo-800 text-white hover:bg-indigo-700 dark:hover:bg-indigo-900",
    secondary:
      "bg-gray-100 text-indigo-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900",
    outline:
      "border border-neutral-500 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-800",
    ghost: "bg-transparent"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg"
  };

  return (
    <button
      className={cn(
        defaultStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
