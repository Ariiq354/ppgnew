import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OPengajianCreate = z.object({
  nama: z.string(),
  tanggal: z.string(),
});

export type TPengajianCreate = z.infer<typeof OPengajianCreate>;

export const OPengajianList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TPengajianList = z.infer<typeof OPengajianList>;
