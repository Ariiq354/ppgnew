import { z } from "zod/mini";
import { ODelete } from "~~/server/utils/dto/common.dto";

export const OLaporanMuslimunCreate = z.object({
  musyawarahId: z.number(),
  laporan: z.string(),
  keterangan: z.string(),
});

export type TLaporanMuslimunCreate = z.infer<typeof OLaporanMuslimunCreate>;

export const OLaporanMuslimunList = z.object({
  musyawarahId: z.coerce.number(),
  kelompokId: z.optional(z.coerce.number()),
});

export const OLaporanMuslimunDesaList = z.object({
  tahun: z.coerce.number(),
  bulan: z.string(),
});

export type TLaporanMuslimunList = z.infer<typeof OLaporanMuslimunList>;

export type TLaporanMuslimunDesaList = z.infer<typeof OLaporanMuslimunDesaList>;

export const OLaporanMuslimunDelete = z.object({
  ...ODelete.def.shape,
  musyawarahId: z.number(),
});

export type TLaporanMuslimunDelete = z.infer<typeof OLaporanMuslimunDelete>;
