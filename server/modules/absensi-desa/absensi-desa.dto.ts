import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OGenerusDesaAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusDesaAbsensiList = z.infer<typeof OGenerusDesaAbsensiList>;

export const OGenerusDesaAbsensiListForDaerah = z.object({
  ...OGenerusDesaAbsensiList.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export type TGenerusDesaAbsensiListForDaerah = z.infer<
  typeof OGenerusDesaAbsensiListForDaerah
>;

export const OAbsensiKelasDesaPengajianForDaerahList = z.object({
  desaId: z.optional(z.coerce.number()),
  kelasPengajian: z.string(),
});

export type TAbsensiKelasDesaPengajianForDaerahList = z.infer<
  typeof OAbsensiKelasDesaPengajianForDaerahList
>;
