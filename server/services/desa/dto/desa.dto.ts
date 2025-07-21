import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const ODesaCreate = z.object({
  name: z.string(),
  daerahId: z.number(),
});

export type TDesaCreate = z.infer<typeof ODesaCreate>;

export const ODesaList = z.object({
  ...OPagination.def.shape,
  daerahId: z.number(),
});

export type TDesaList = z.infer<typeof ODesaList>;
