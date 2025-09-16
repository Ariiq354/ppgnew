import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OKonselingCreate = z.object({
  generusId: z.number(),
  keterangan: z.string(),
  status: z.enum(["Baru", "Diproses", "Selesai"]),
});

export type TKonselingCreate = z.infer<typeof OKonselingCreate>;

export const OKonselingList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelompokId: z.optional(z.coerce.number()),
});

export type TKonselingList = z.infer<typeof OKonselingList>;
