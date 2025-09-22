import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const ODeleteSchema = z.object({
  id: z.array(z.number()),
});

export const ODeleteBidangSchema = z.object({
  id: z.array(z.number()),
  bidang: z.enum(roles),
});

export const OBidangSchema = z.object({
  bidang: z.enum(roles),
});

export const OPagination = z.object({
  page: z._default(z.coerce.number(), 1),
  limit: z._default(z.coerce.number(), 10),
});

export const OSearchPagination = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export const OWilayah = z.object({
  daerahId: z.number(),
  desaId: z.number(),
  kelompokId: z.number(),
});

export const ONamaTanggal = z.object({
  nama: z.string(),
  tanggal: z.string(),
});

export const OKelasList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export const OKelasOptionsList = z.object({
  nama: z.optional(z.string()),
});

export const OAbsensiGenerusCreate = z.object({
  kelasId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      generusId: z.number(),
      keterangan: z.string(),
      detail: z.string(),
    })
  ),
});

export const OGenerusAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
});

export const OAbsensiKelasPengajianList = z.object({
  kelasPengajian: z.string(),
});

export type TGenerusAbsensiList = z.infer<typeof OGenerusAbsensiList>;

export type TAbsensiGenerusCreate = z.infer<
  typeof OAbsensiGenerusCreate
>["absen"][number];

export type TAbsensiKelasPengajianList = z.infer<
  typeof OAbsensiKelasPengajianList
>;

export type TKelasList = z.infer<typeof OKelasList>;

export type TKelasOptionsList = z.infer<typeof OKelasOptionsList>;

export type TSearchPagination = z.infer<typeof OSearchPagination>;

export type TWilayah = z.infer<typeof OWilayah>;

export type TPagination = z.infer<typeof OPagination>;

export type TNamaTanggal = z.infer<typeof ONamaTanggal>;

export type TPaginationMetadata = {
  page: number;
  total: number;
  itemPerPage: number;
};
