import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto/common.dto";
import { kelasGenerusEnum } from "~~/shared/enum";

export const OGenerusAbsensiForDesaList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
  tahun: z.optional(z.coerce.number()),
  bulan: z.optional(z.coerce.number()),
  kelompokId: z.optional(z.optional(z.coerce.number())),
  kelasPengajian: z.enum(kelasGenerusEnum),
});

export type TGenerusAbsensiForDesaList = z.infer<
  typeof OGenerusAbsensiForDesaList
>;

export const OAbsensiKelasPengajianForDesaList = z.object({
  kelompokId: z.optional(z.coerce.number()),
  tahun: z.optional(z.coerce.number()),
  bulan: z.optional(z.coerce.number()),
  kelasPengajian: z.enum(kelasGenerusEnum),
});

export type TAbsensiKelasPengajianForDesaList = z.infer<
  typeof OAbsensiKelasPengajianForDesaList
>;

export const OGenerusAbsensiForDaerahList = z.object({
  ...OGenerusAbsensiForDesaList.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export const OGenerusAbsensiForMudamudiList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
  kelompokId: z.optional(z.coerce.number()),
  desaId: z.optional(z.coerce.number()),
});

export type TGenerusAbsensiForDaerahList = z.infer<
  typeof OGenerusAbsensiForDaerahList
>;

export const OAbsensiKelasPengajianForDaerahList = z.object({
  ...OAbsensiKelasPengajianForDesaList.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export const OAbsensiKelasPengajianForMudamudiList = z.object({
  kelompokId: z.optional(z.coerce.number()),
  desaId: z.optional(z.coerce.number()),
});

export type TAbsensiKelasPengajianForDaerahList = z.infer<
  typeof OAbsensiKelasPengajianForDaerahList
>;
