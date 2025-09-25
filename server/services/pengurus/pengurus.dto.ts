import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const OPengurusCreate = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.string(),
  pendidikan: z.string(),
  bidang: z.enum(roles),
  foto: z.string(),
});

export type TPengurusCreate = z.infer<typeof OPengurusCreate>;
