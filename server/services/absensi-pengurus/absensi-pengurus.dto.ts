import { z } from "zod/mini";

export const OAbsensiPengurusCreate = z.object({
  musyawarahId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      pengurusId: z.number(),
      keterangan: z.string(),
      detail: z.string(),
    })
  ),
});

export type TAbsensiPengurusCreate = z.infer<
  typeof OAbsensiPengurusCreate
>["absen"][number];
