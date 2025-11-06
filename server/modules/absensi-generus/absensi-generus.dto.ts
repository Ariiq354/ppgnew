import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OGenerusAbsensiForDesaList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelompokId: z.optional(z.coerce.number()),
  kelasPengajian: z.string(),
});

export type TGenerusAbsensiForDesaList = z.infer<
  typeof OGenerusAbsensiForDesaList
>;

export const OGenerusAbsensiForDaerahList = z.object({
  ...OGenerusAbsensiForDesaList.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export type TGenerusAbsensiForDaerahList = z.infer<
  typeof OGenerusAbsensiForDaerahList
>;

export const OAbsensiKelasPengajianForDesaList = z.object({
  kelompokId: z.optional(z.coerce.number()),
  kelasPengajian: z.string(),
});

export type TAbsensiKelasPengajianForDesaList = z.infer<
  typeof OAbsensiKelasPengajianForDesaList
>;

export const OAbsensiKelasPengajianForDaerahList = z.object({
  ...OAbsensiKelasPengajianForDesaList.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export type TAbsensiKelasPengajianForDaerahList = z.infer<
  typeof OAbsensiKelasPengajianForDaerahList
>;
