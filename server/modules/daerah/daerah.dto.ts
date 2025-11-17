import { z } from "zod/mini";

export const ODaerahCreate = z.object({
  name: z.string(),
  singkatan: z.string(),
});

export type TDaerahCreate = z.infer<typeof ODaerahCreate>;
