import { z } from "zod/mini";
import { OGenerusAbsensiList } from "~~/server/utils/dto";

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

export const OGenerusListForDesa = z.object({
  ...OGenerusAbsensiList.def.shape,
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusListForDesa = z.infer<typeof OGenerusListForDesa>;

export const OGenerusListForDaerah = z.object({
  ...OGenerusListForDesa.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export type TGenerusListForDaerah = z.infer<typeof OGenerusListForDaerah>;
