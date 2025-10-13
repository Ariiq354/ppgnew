import { z } from "zod/mini";

export const OJamaahCreate = z.object({
  nama: z.string(),
});

export type TJamaahCreate = z.infer<typeof OJamaahCreate>;
