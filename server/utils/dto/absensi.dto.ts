import { z } from "zod/mini";
import {
  absensiEnum,
  kelasGenerusEnum,
  kelasMudamudiEnum,
} from "~~/shared/enum";
import { OPagination } from "./common.dto";

export const OAbsensiGenerusCreate = z.object({
  kelasId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      generusId: z.number(),
      keterangan: z.enum(absensiEnum),
      detail: z.string(),
    })
  ),
});
export type TAbsensiGenerusCreate = z.infer<
  typeof OAbsensiGenerusCreate
>["absen"][number];

export const OGenerusAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
  tahun: z.optional(z.coerce.number()),
  bulan: z.optional(z.coerce.number()),
  kelasPengajian: z.enum(kelasGenerusEnum),
});
export type TGenerusAbsensiList = z.infer<typeof OGenerusAbsensiList>;

export const OMudamudiAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.enum(kelasMudamudiEnum),
});
export type TMudamudiAbsensiList = z.infer<typeof OMudamudiAbsensiList>;

export const OAbsensiKelasPengajianGenerusList = z.object({
  kelasPengajian: z.enum(kelasGenerusEnum),
  tahun: z.optional(z.coerce.number()),
  bulan: z.optional(z.coerce.number()),
});
export type TAbsensiKelasPengajianGenerusList = z.infer<
  typeof OAbsensiKelasPengajianGenerusList
>;

export const OAbsensiKelasPengajianMudamudiList = z.object({
  kelasPengajian: z.enum(kelasMudamudiEnum),
});
export type TAbsensiKelasPengajianMudamudiList = z.infer<
  typeof OAbsensiKelasPengajianMudamudiList
>;

export const OTahunBulan = z.object({
  tahun: z.optional(z.coerce.number()),
  bulan: z.optional(z.coerce.number())
});
export type TTahunBulan = z.infer<typeof OTahunBulan>;
