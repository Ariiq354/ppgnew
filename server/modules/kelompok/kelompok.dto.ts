import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto/common.dto";
export const OKelompokCreate = z.object({
  name: z.string(),
  desaId: z.number(),
});

export type TKelompokCreate = z.infer<typeof OKelompokCreate>;

export const OKelompokList = z.object({
  ...OPagination.def.shape,
  desaId: z.coerce.number(),
});

export type TKelompokList = z.infer<typeof OKelompokList>;
