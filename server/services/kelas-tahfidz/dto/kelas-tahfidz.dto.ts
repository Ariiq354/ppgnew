import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelasTahfidzList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export type TKelasTahfidzList = z.infer<typeof OKelasTahfidzList>;

export const OKelasTahfidzOptionsList = z.object({
  nama: z.optional(z.string()),
});

export type TKelasTahfidzOptionsList = z.infer<typeof OKelasTahfidzOptionsList>;
