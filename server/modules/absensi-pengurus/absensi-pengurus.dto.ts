import { z } from "zod/mini";
import { absensiEnum } from "~~/shared/enum";

export const OAbsensiPengurusCreate = z.object({
  musyawarahId: z.number(),
  absen: z.array(
    z.object({
      id: z.optional(z.number()),
      pengurusId: z.number(),
      keterangan: z.enum(absensiEnum),
      detail: z.string(),
    })
  ),
});

export type TAbsensiPengurusCreate = z.infer<
  typeof OAbsensiPengurusCreate
>["absen"][number];
