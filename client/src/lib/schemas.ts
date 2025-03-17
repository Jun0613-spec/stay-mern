import { z } from "zod";

import { UserRole } from "@/types";

export const searchSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  checkIn: z.date(),
  checkOut: z.date(),
  adultCount: z.number().min(1).max(20),
  childCount: z.number().min(0).max(20)
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email")
    .max(100, "Email cannot be longer than 100 characters"),
  password: z
    .string()
    .min(8, "Minumum 8 characters required")
    .max(16, "Password cannot be longer than 16 characters")
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name cannot be longer than 50 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name cannot be longer than 50 characters"),
    role: z.nativeEnum(UserRole, {
      errorMap: () => ({ message: "Invalid role selected" })
    }),
    email: z
      .string()
      .email("Invalid email")
      .max(100, "Email cannot be longer than 100 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password cannot be longer than 16 characters"),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
