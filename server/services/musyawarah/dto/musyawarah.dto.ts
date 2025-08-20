import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OMusyawarahCreate = z.object({
  nama: z.string(),
  tanggal: z.string(),
});

export type TMusyawarahCreate = z.infer<typeof OMusyawarahCreate>;

export const OMusyawarahList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TMusyawarahList = z.infer<typeof OMusyawarahList>;
