import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OPengajarCreate = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.iso.date(),
  pendidikan: z.string(),
  status: z.string(),
  gender: z.string(),
  tanggalTugas: z.iso.date(),
  noTelepon: z.string(),
  foto: z.string(),
});

export type TPengajarCreate = z.infer<typeof OPengajarCreate>;
export type TWilayah = {
  daerahId: number;
  desaId: number;
  kelompokId: number;
};

export const OPengajarList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  status: z.string(),
  desaId: z.optional(z.coerce.number()),
  kelompokId: z.optional(z.coerce.number()),
});

export type TPengajarList = z.infer<typeof OPengajarList>;
