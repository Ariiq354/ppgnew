import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const ODeleteSchema = z.object({
  id: z.array(z.number()),
});

export const ODeleteBidangSchema = z.object({
  id: z.array(z.number()),
  bidang: z.enum(roles),
});

export const OBidangSchema = z.object({
  bidang: z.enum(roles),
});

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
