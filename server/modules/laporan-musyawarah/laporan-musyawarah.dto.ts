import { z } from "zod/mini";
import { ODelete } from "~~/server/utils/dto/common.dto";
import { bidangEnum } from "~~/shared/enum";

export const OLaporanMusyawarahCreate = z.object({
  musyawarahId: z.number(),
  bidang: z.enum(bidangEnum),
  laporan: z.string(),
  keterangan: z.string(),
});

export type TLaporanMusyawarahCreate = z.infer<typeof OLaporanMusyawarahCreate>;

export const OLaporanMusyawarahList = z.object({
  musyawarahId: z.coerce.number(),
  bidang: z.enum(bidangEnum),
});

export type TLaporanMusyawarahList = z.infer<typeof OLaporanMusyawarahList>;

export const OSummaryLaporanMusyawarahList = z.object({
  musyawarahId: z.coerce.number(),
});

export type TLaporanMusyawarahSummaryList = z.infer<
  typeof OSummaryLaporanMusyawarahList
>;

export const OLaporanMusyawarahDelete = z.object({
  ...ODelete.def.shape,
  musyawarahId: z.number(),
  bidang: z.enum(bidangEnum),
});

export type TLaporanMusyawarahDelete = z.infer<typeof OLaporanMusyawarahDelete>;
