import { z } from "zod/mini";

export const OAbsensiTahfidzCreate = z.object({
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

export type TAbsensiTahfidzCreate = z.infer<
  typeof OAbsensiTahfidzCreate
>["absen"][number];
