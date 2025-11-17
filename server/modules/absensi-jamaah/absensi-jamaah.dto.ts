import { z } from "zod/mini";
import { absensiEnum } from "~~/shared/enum";

export const OAbsensiJamaahCreate = z.object({
  pengajianId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      jamaahId: z.number(),
      keterangan: z.enum(absensiEnum),
      detail: z.string(),
    })
  ),
});

export type TAbsensiJamaahCreate = z.infer<
  typeof OAbsensiJamaahCreate
>["absen"][number];
