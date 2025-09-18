import { z } from "zod/mini";

export const OAbsensiKeputrianCreate = z.object({
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

export const OKeputrianAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
});

export type TKeputrianAbsensiList = z.infer<typeof OKeputrianAbsensiList>;

export type TAbsensiKeputrianCreate = z.infer<
  typeof OAbsensiKeputrianCreate
>["absen"][number];

export const OAbsensiKelasPengajianList = z.object({
  kelasPengajian: z.string(),
});

export type TAbsensiKelasPengajianList = z.infer<
  typeof OAbsensiKelasPengajianList
>;
