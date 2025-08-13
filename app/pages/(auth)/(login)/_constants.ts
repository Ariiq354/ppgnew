import { z } from "zod/mini";

export const schema = z.object({
  username: z.string().check(z.minLength(1, "Required")),
  password: z.string().check(z.minLength(1, "Required")),
  rememberMe: z.boolean(),
});

export const initFormData: Schema = {
  username: "",
  password: "",
  rememberMe: false,
};

export type Schema = z.infer<typeof schema>;
