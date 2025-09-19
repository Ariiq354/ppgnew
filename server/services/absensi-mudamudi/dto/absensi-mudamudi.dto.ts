import { z } from "zod/mini";

export const OAbsensiMudamudiCreate = z.object({
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

export const OMudamudiAbsensiList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.string(),
});

export type TMudamudiAbsensiList = z.infer<typeof OMudamudiAbsensiList>;

export type TAbsensiMudamudiCreate = z.infer<
  typeof OAbsensiMudamudiCreate
>["absen"][number];

export const OAbsensiKelasPengajianList = z.object({
  kelasPengajian: z.string(),
});

export type TAbsensiKelasPengajianList = z.infer<
  typeof OAbsensiKelasPengajianList
>;
