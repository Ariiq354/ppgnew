import { z } from "zod/mini";

export const schema = z.object({
  daerah: z.string().check(z.minLength(1, "Required")),
});

export type Schema = z.infer<typeof schema>;

export const getInitialFormData = (): Schema => ({
  daerah: "",
});
