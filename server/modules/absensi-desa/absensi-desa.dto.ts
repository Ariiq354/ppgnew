import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto/common.dto";
import { OTahunBulan } from "~~/server/utils/dto/absensi.dto";
import { kelasGenerusEnum } from "~~/shared/enum";

export const OGenerusDesaAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  tahun: z.optional(z.number()),
  bulan: z.optional(z.number()),
  kelasPengajian: z.enum(kelasGenerusEnum),
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusDesaAbsensiList = z.infer<typeof OGenerusDesaAbsensiList>;

export const OGenerusDesaAbsensiListForDaerah = z.object({
  ...OGenerusDesaAbsensiList.def.shape,
  desaId: z.optional(z.coerce.number()),
});

export const OGenerusDesaAbsensiListForMudamudi = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelompokId: z.optional(z.coerce.number()),
  desaId: z.optional(z.coerce.number()),
});

export type TGenerusDesaAbsensiListForDaerah = z.infer<
  typeof OGenerusDesaAbsensiListForDaerah
>;

export const OAbsensiKelasDesaPengajianForDaerahList = z.object({
  desaId: z.optional(z.coerce.number()),
  kelasPengajian: z.enum(kelasGenerusEnum),
});

export const OAbsensiKelasDesaPengajianForMudamudiList = z.object({
  desaId: z.optional(z.coerce.number()),
});

export type TAbsensiKelasDesaPengajianForDaerahList = z.infer<
  typeof OAbsensiKelasDesaPengajianForDaerahList
>;

export const OTahunBulanDesa = z.object({
  ...OTahunBulan.def.shape,
  kelompokId: z.optional(z.coerce.number()),
});
