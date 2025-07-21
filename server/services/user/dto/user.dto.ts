import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto";

export const OUserList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TUserList = z.infer<typeof OUserList>;
