import { z } from "zod";

export const signupValidate = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "email cannot be empty" }),
  password: z.string().min(6, { message: "provide atleast 6 characters" }),
});

export const singinValidate = z.object({
  email: z.string().email({ message: "email cannot be empty" }),
  password: z.string(),
});

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlog = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

// type inference in zod...
export type SignupValidate = z.infer<typeof signupValidate>;
export type SigninValidate = z.infer<typeof singinValidate>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
