import { z } from "zod/mini";

export const OAbsensiGpsCreate = z.object({
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

export type TAbsensiGpsCreate = z.infer<
  typeof OAbsensiGpsCreate
>["absen"][number];
