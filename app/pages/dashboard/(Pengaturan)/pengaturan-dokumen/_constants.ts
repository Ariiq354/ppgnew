import { z } from "zod/mini";

export const schema = z.object({
  file: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  file: "",
});

export type Schema = z.infer<typeof schema>;
