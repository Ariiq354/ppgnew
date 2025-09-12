import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKonselingCreate = z.object({
  generusId: z.string(),
  keterangan: z.string(),
  status: z.string(),
});

export type TKonselingCreate = z.infer<typeof OKonselingCreate>;

export const OKonselingList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TKonselingList = z.infer<typeof OKonselingList>;
