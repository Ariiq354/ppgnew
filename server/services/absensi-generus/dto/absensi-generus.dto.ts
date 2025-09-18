import { z } from "zod/mini";

export const OAbsensiGenerusCreate = z.object({
  kelasId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      generusId: z.number(),
      keterangan: z.string(),
      detail: z.string(),
    })
  ),
});

export const OGenerusAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
});

export type TGenerusAbsensiList = z.infer<typeof OGenerusAbsensiList>;

export type TAbsensiGenerusCreate = z.infer<
  typeof OAbsensiGenerusCreate
>["absen"][number];

export const OAbsensiKelasPengajianList = z.object({
  kelasPengajian: z.string(),
});

export type TAbsensiKelasPengajianList = z.infer<
  typeof OAbsensiKelasPengajianList
>;
