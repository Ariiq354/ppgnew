import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const OLaporanMusyawarahCreate = z.object({
  musyawarahId: z.number(),
  bidang: z.enum(roles),
  laporan: z.string(),
  keterangan: z.string(),
});

export type TLaporanMusyawarahCreate = z.infer<typeof OLaporanMusyawarahCreate>;

export const OLaporanMusyawarahList = z.object({
  musyawarahId: z.number(),
  bidang: z.enum(roles),
});

export type TLaporanMusyawarahList = z.infer<typeof OLaporanMusyawarahList>;
