import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";
import { roles } from "~~/shared/permission";

export const OPengurusCreate = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.string(),
  pendidikan: z.string(),
  bidang: z.enum(roles),
  foto: z.string(),
});

export type TPengurusCreate = z.infer<typeof OPengurusCreate>;

export const OPengurusList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TPengurusList = z.infer<typeof OPengurusList>;
