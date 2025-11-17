import { z } from "zod/mini";
import { bidangEnum } from "~~/shared/enum";

export const OPengurusCreate = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.string(),
  pendidikan: z.string(),
  bidang: z.enum(bidangEnum),
  foto: z.string(),
});

export type TPengurusCreate = z.infer<typeof OPengurusCreate>;
