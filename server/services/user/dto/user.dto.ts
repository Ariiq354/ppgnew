import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OUserList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TUserList = z.infer<typeof OUserList>;

export const OUserWilayah = z.object({
  daerahId: z.number(),
  desaId: z.number(),
  kelompokId: z.number(),
});

export type TUserWilayah = z.infer<typeof OUserWilayah>;
