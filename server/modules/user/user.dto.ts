import { z } from "zod/mini";

export const ORegister = z.object({
  daerah: z.string(),
  singakatan: z.string(),
});
