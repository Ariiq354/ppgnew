import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto/common.dto";
import { bidangEnum } from "~~/shared/enum";

export const OMusyawarahBidangCreate = z.object({
  nama: z.string(),
  tanggal: z.string(),
  bidang: z.enum(bidangEnum),
});

export type TMusyawarahBidangCreate = z.infer<typeof OMusyawarahBidangCreate>;

export const OMusyawarahBidangList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
  bidang: z.enum(bidangEnum),
});

export type TMusyawarahBidangList = z.infer<typeof OMusyawarahBidangList>;
