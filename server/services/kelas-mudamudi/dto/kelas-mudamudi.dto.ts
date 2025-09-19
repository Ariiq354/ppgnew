import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelasMudamudiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  nama: z.string(),
  tahun: z.string(),
  bulan: z.string(),
});

export type TKelasMudamudiList = z.infer<typeof OKelasMudamudiList>;

export const OKelasMudamudiOptionsList = z.object({
  nama: z.optional(z.string()),
});

export type TKelasMudamudiOptionsList = z.infer<
  typeof OKelasMudamudiOptionsList
>;
