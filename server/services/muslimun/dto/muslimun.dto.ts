import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OMuslimunList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  tahun: z.string(),
});

export type TMuslimunList = z.infer<typeof OMuslimunList>;
