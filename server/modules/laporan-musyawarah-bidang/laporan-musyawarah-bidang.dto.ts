import { z } from "zod/mini";
import { ODelete } from "~~/server/utils/dto";
import { roles } from "~~/shared/permission";

export const OLaporanMusyawarahBidangCreate = z.object({
  musyawarahId: z.number(),
  bidang: z.enum(roles),
  laporan: z.string(),
  keterangan: z.string(),
});

export type TLaporanMusyawarahBidangCreate = z.infer<
  typeof OLaporanMusyawarahBidangCreate
>;

export const OLaporanMusyawarahBidangList = z.object({
  musyawarahId: z.coerce.number(),
  bidang: z.enum(roles),
});

export const OSummaryLaporanMusyawarahBidangList = z.object({
  musyawarahId: z.coerce.number(),
});

export type TLaporanMusyawarahBidangList = z.infer<
  typeof OLaporanMusyawarahBidangList
>;

export const OLaporanMusyawarahBidangDelete = z.object({
  ...ODelete.def.shape,
  musyawarahId: z.number(),
  bidang: z.enum(roles),
});

export type TLaporanMusyawarahBidangDelete = z.infer<
  typeof OLaporanMusyawarahBidangDelete
>;
