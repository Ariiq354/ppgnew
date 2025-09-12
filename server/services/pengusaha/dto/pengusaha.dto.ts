import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OPengusahaCreate = z.object({
  nama: z.string(),
  bidangPekerjaan: z.string(),
  namaUsaha: z.string(),
  noTelepon: z.string(),
});

export type TPengusahaCreate = z.infer<typeof OPengusahaCreate>;

export const OPengusahaList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TPengusahaList = z.infer<typeof OPengusahaList>;
