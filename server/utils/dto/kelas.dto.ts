import { z } from "zod/mini";
import { kelasGenerusEnum, kelasMudamudiEnum } from "~~/shared/enum";
import { OPagination } from "./common.dto";

export const ONamaTanggal = z.object({
  nama: z.string(),
  tanggal: z.string(),
});
export type TNamaTanggal = z.infer<typeof ONamaTanggal>;

export const ONamaMudamudiTanggal = z.object({
  nama: z.enum(kelasMudamudiEnum),
  keterangan: z._default(z.string(), ""),
  tanggal: z.string(),
});
export type TNamaMudamudiTanggal = z.infer<typeof ONamaMudamudiTanggal>;

export const ONamaGenerusTanggal = z.object({
  nama: z.enum(kelasGenerusEnum),
  keterangan: z._default(z.string(), ""),
  tanggal: z.string(),
});
export type TNamaGenerusTanggal = z.infer<typeof ONamaGenerusTanggal>;

export const OKelas = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
  tahun: z.optional(z.coerce.number()),
  bulan: z.optional(z.coerce.number()),
});
export type TKelas = z.infer<typeof OKelas>;

export const OKelasGenerus = z.object({
  ...OKelas.def.shape,
  nama: z.optional(z.enum(kelasGenerusEnum)),
});
export type TKelasGenerus = z.infer<typeof OKelasGenerus>;

export const OKelasMudamudi = z.object({
  ...OKelas.def.shape,
  nama: z.optional(z.enum(kelasMudamudiEnum)),
});
export type TKelasMudamudi = z.infer<typeof OKelasMudamudi>;

export const OKelasGeneric = z.object({
  ...OKelas.def.shape,
  nama: z.optional(z.string()),
});
export type TKelasGeneric = z.infer<typeof OKelasGeneric>;

export const OKelasMudamudiList = z.object({
  nama: z.optional(z.enum(kelasMudamudiEnum)),
});
export type TKelasMudamudiList = z.infer<typeof OKelasMudamudiList>;

export const OKelasGenerusList = z.object({
  nama: z.optional(z.enum(kelasGenerusEnum)),
});
export type TKelasGenerusList = z.infer<typeof OKelasGenerusList>;
