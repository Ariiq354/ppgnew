import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const schema = z.object({
  id: z.optional(z.number()),
  bidang: z.enum(roles),
  laporan: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  bidang: "kurikulum",
  laporan: "",
  keterangan: "",
});

export type Schema = z.infer<typeof schema>;
