import { z } from "zod/mini";
import { bidangEnum } from "~~/shared/enum";

export const schema = z.object({
  id: z.optional(z.number()),
  bidang: z.enum(bidangEnum),
  laporan: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  bidang: "kegiatan_muda_mudi",
  laporan: "",
  keterangan: "",
});

export type Schema = z.infer<typeof schema>;
