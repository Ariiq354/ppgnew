import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OGenerusCreate = z.object({
  nama: z.string(),
  noTelepon: z.string(),
  noTeleponOrtu: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.iso.date(),
  gender: z.string(),
  namaOrtu: z.string(),
  kelasSekolah: z.string(),
  kelasPengajian: z.string(),
  foto: z.string(),
  status: z.array(z.string()),
});

export type TGenerusCreate = z.infer<typeof OGenerusCreate>;

export const OGenerusList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
  desaId: z.optional(z.coerce.number()),
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusList = z.infer<typeof OGenerusList>;
