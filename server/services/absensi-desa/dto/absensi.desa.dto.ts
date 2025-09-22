import { z } from "zod/mini";

export const OGenerusDesaAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
  kelompokId: z.optional(z.coerce.number()),
});

export type TGenerusDesaAbsensiList = z.infer<typeof OGenerusDesaAbsensiList>;
