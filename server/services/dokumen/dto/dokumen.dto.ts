import { z } from "zod/mini";

export const ODokumenCreate = z.object({
  name: z.string(),
  url: z.string(),
  size: z.coerce.number(),
  type: z.string(),
});

export type TDokumenCreate = z.infer<typeof ODokumenCreate>;
