import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OGenerusAbsensiKelompokList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelompokId: z.coerce.number(),
  kelasPengajian: z.string(),
});

export type TGenerusAbsensiKelompokList = z.infer<
  typeof OGenerusAbsensiKelompokList
>;

export const OAbsensiKelasPengajianKelompokList = z.object({
  kelompokId: z.coerce.number(),
  kelasPengajian: z.string(),
});

export type TAbsensiKelasPengajianKelompokList = z.infer<
  typeof OAbsensiKelasPengajianKelompokList
>;
