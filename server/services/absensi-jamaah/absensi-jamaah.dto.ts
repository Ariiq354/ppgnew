import { z } from "zod/mini";

export const OAbsensiJamaahCreate = z.object({
  pengajianId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      jamaahId: z.number(),
      keterangan: z.string(),
      detail: z.string(),
    })
  ),
});

export type TAbsensiJamaahCreate = z.infer<
  typeof OAbsensiJamaahCreate
>["absen"][number];
