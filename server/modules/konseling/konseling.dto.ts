import { z } from "zod/mini";

export const OKonselingCreate = z.object({
  generusId: z.number(),
  keterangan: z.string(),
});

export type TKonselingCreate = z.infer<typeof OKonselingCreate>;

export const OKonselingUpdate = z.object({
  generusId: z.number(),
  status: z.enum(["Baru", "Diproses", "Selesai"]),
});

export type TKonselingUpdate = z.infer<typeof OKonselingUpdate>;
