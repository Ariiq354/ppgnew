import { z } from "zod/mini";

export const ODesaCreate = z.object({
  name: z.string(),
  daerahId: z.number(),
});

export type TDesaCreate = z.infer<typeof ODesaCreate>;
