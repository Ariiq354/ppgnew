import { z } from "zod/mini";

export const loginSchema = z.object({
  username: z.string().check(z.minLength(1, "Required")),
  password: z.string().check(z.minLength(1, "Required")),
  rememberMe: z.boolean(),
});

export const initFormDataLogin: LoginSchema = {
  username: "",
  password: "",
  rememberMe: false,
};

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  daerah: z.string().check(z.minLength(1, "Required")),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const initFormDataRegister: RegisterSchema = {
  daerah: "",
};
