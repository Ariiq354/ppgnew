import { z } from "zod/mini";

export const OPengusahaCreate = z.object({
  nama: z.string(),
  bidangPekerjaan: z.string(),
  namaUsaha: z.string(),
  noTelepon: z.string(),
});

export type TPengusahaCreate = z.infer<typeof OPengusahaCreate>;
