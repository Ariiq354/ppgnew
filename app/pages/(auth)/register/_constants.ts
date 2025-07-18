import { z } from "zod/mini";

export const schema = z.object({
  daerah: z
    .string()
    .check(z.minLength(1, "Required"), z.minLength(8, "Nama terlalu pendek")),
});

export type Schema = z.infer<typeof schema>;

export const getInitialFormData = (): Schema => ({
  daerah: "",
});
