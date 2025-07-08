import { z } from "zod/v4-mini";

export const loginSchema = z.object({
  name: z.string().check(z.minLength(1, "Required")),
  noTelepon: z.string().check(z.minLength(1, "Required")),
  email: z.string().check(z.minLength(1, "Required"), z.email()),
  password: z
    .string()
    .check(
      z.minLength(1, "Required"),
      z.minLength(8, "Password must be 8 character or more")
    ),
});

export const getInitialFormData = (): Schema => ({
  email: "",
  password: "",
  noTelepon: "",
  name: "",
});

export type Schema = z.infer<typeof loginSchema>;
