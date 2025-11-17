import { z } from "zod/mini";
import { OGenerusGenericList } from "~~/server/utils/dto/generus.dto";
import { OGenerusAbsensiList } from "~~/server/utils/dto/absensi.dto";
import { genderEnum, pengajianEnum, sekolahEnum } from "~~/shared/enum";

export const OGenerusCreate = z.object({
  nama: z.string(),
  noTelepon: z.string(),
  noTeleponOrtu: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.iso.date(),
  gender: z.enum(genderEnum),
  namaOrtu: z.string(),
  kelasSekolah: z.enum(sekolahEnum),
  kelasPengajian: z.enum(pengajianEnum),
  foto: z.string(),
  status: z.array(z.string()),
});

export type TGenerusCreate = z.infer<typeof OGenerusCreate>;

export const OGenerusListForDesa = z.object({
  ...OGenerusGenericList.def.shape,
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusListForDesa = z.infer<typeof OGenerusListForDesa>;

export const OGenerusAbsensiForDesa = z.object({
  ...OGenerusAbsensiList.def.shape,
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusAbsensiForDesa = z.infer<typeof OGenerusAbsensiForDesa>;

export const OGenerusListForDaerah = z.object({
  ...OGenerusListForDesa.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export type TGenerusListForDaerah = z.infer<typeof OGenerusListForDaerah>;
