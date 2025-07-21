import { z } from "zod/mini";

export const ODeleteSchema = z.object({
  id: z.array(z.number()),
});

export type TDeleteDto = z.infer<typeof ODeleteSchema>;

export const OPagination = z.object({
  page: z._default(z.coerce.number(), 1),
  limit: z._default(z.coerce.number(), 10),
});

export type TPagination = z.infer<typeof OPagination>;

export type TPaginationMetadata = {
  page: number;
  total: number;
  itemPerPage: number;
};
