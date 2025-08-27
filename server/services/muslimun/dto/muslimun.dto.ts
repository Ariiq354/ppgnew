import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OMuslimunCreate = z.object({
  nama: z.string(),
  tanggal: z.string(),
});

export type TMuslimunCreate = z.infer<typeof OMuslimunCreate>;

export const OMuslimunList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  tahun: z.string(),
});

export type TMuslimunList = z.infer<typeof OMuslimunList>;
