import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelasKeputrianList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export type TKelasKeputrianList = z.infer<typeof OKelasKeputrianList>;

export const OKelasKeputrianOptionsList = z.object({
  nama: z.optional(z.string()),
});

export type TKelasKeputrianOptionsList = z.infer<
  typeof OKelasKeputrianOptionsList
>;
