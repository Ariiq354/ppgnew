import { z } from "zod/mini";

export const OGenerusAbsensiKelompokList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelompokId: z.coerce.number(),
  kelasPengajian: z.string(),
});

export const OAbsensiKelasPengajianKelompokList = z.object({
  kelompokId: z.coerce.number(),
  kelasPengajian: z.string(),
});
