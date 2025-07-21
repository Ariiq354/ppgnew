import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKelompokCreate = z.object({
  name: z.string(),
  desaId: z.number(),
});

export type TKelompokCreate = z.infer<typeof OKelompokCreate>;

export const OKelompokList = z.object({
  ...OPagination.def.shape,
  desaId: z.number(),
});

export type TKelompokList = z.infer<typeof OKelompokList>;
