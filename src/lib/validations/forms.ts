import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type ContactFormValues = z.infer<typeof contactSchema>;

// Sign-in accepts either an email address or a username. The field is still named `email`
// in the shared form, but it holds an identifier (resolved to an email at submit time).
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const usernamePattern = /^[a-zA-Z0-9_.-]{2,}$/;

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your username or email")
    .refine((value) => emailPattern.test(value) || usernamePattern.test(value), "Enter your username or email"),
  password: z.string().min(1, "Enter your password")
});

export const isEmailIdentifier = (value: string) => value.includes("@");

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(2, "User name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z.string().min(2, "Country of residence is required"),
  gender: z.string().min(1, "Select a gender option"),
  terms: z.literal(true, {
    error: "You must agree to the Terms and Conditions"
  })
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Enter a valid email")
});

export type SignInValues = z.infer<typeof signInSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
