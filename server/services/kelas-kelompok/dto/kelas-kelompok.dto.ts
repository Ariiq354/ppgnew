import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelasCreate = z.object({
  nama: z.string(),
  tanggal: z.string(),
});

export type TKelasCreate = z.infer<typeof OKelasCreate>;

export const OKelasList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export type TKelasList = z.infer<typeof OKelasList>;

export const OKelasOptionsList = z.object({
  nama: z.optional(z.string()),
});

export type TKelasOptionsList = z.infer<typeof OKelasOptionsList>;
