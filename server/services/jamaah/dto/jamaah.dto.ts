import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OJamaahCreate = z.object({
  nama: z.string(),
});

export type TWilayah = {
  daerahId: number;
  desaId: number;
  kelompokId: number;
};

export type TJamaahCreate = z.infer<typeof OJamaahCreate>;

export const OJamaahList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
});

export type TJamaahList = z.infer<typeof OJamaahList>;
