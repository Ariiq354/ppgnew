import { z } from "zod/mini";

export const schema = z.object({
  id: z.optional(z.number()),
  laporan: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  laporan: "",
  keterangan: "",
});

export type Schema = z.infer<typeof schema>;
