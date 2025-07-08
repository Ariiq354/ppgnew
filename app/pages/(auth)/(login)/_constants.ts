import { z } from "zod/v4-mini";

export const loginSchema = z.object({
  daerah: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  daerah: "",
});

export type Schema = z.infer<typeof loginSchema>;
