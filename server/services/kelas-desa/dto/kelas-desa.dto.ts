import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelasDesaList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export type TKelasDesaList = z.infer<typeof OKelasDesaList>;

export const OKelasDesaOptionsList = z.object({
  nama: z.optional(z.string()),
});

export type TKelasDesaOptionsList = z.infer<typeof OKelasDesaOptionsList>;
