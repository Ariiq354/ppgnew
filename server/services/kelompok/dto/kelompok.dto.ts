import { z } from "zod/mini";

export const OKelompokCreate = z.object({
  name: z.string(),
  desaId: z.number(),
});

export type TKelompokCreate = z.infer<typeof OKelompokCreate>;
