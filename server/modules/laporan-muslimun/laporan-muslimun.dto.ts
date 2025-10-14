import { z } from "zod/mini";

export const OLaporanMuslimunCreate = z.object({
  musyawarahId: z.number(),
  laporan: z.string(),
  keterangan: z.string(),
});

export type TLaporanMuslimunCreate = z.infer<typeof OLaporanMuslimunCreate>;

export const OLaporanMuslimunList = z.object({
  musyawarahId: z.coerce.number(),
});

export type TLaporanMuslimunList = z.infer<typeof OLaporanMuslimunList>;

export const OLaporanMuslimunDelete = z.object({
  ...ODelete.def.shape,
  musyawarahId: z.number(),
});

export type TLaporanMuslimunDelete = z.infer<typeof OLaporanMuslimunDelete>;
