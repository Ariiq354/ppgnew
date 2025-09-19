import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelasGpsList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export type TKelasGpsList = z.infer<typeof OKelasGpsList>;

export const OKelasGpsOptionsList = z.object({
  nama: z.optional(z.string()),
});

export type TKelasGpsOptionsList = z.infer<typeof OKelasGpsOptionsList>;
