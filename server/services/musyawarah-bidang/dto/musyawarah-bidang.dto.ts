import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";
import { roles } from "~~/shared/permission";

export const OMusyawarahBidangCreate = z.object({
  nama: z.string(),
  tanggal: z.string(),
  bidang: z.enum(roles),
});

export type TMusyawarahBidangCreate = z.infer<typeof OMusyawarahBidangCreate>;

export const OMusyawarahBidangList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TMusyawarahBidangList = z.infer<typeof OMusyawarahBidangList>;
