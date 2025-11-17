import { z } from "zod/mini";
import { bidangEnum } from "~~/shared/enum";

export const OParam = z.coerce.number();

export const OBidang = z.object({
  bidang: z.enum(bidangEnum),
});
export type TBidang = z.infer<typeof OBidang>;

export const ODelete = z.object({
  id: z.array(z.number()),
});
export type TDelete = z.infer<typeof ODelete>;

export const ODeleteBidang = z.object({
  ...OBidang.def.shape,
  id: z.array(z.number()),
  bidang: z.enum(bidangEnum),
});
export type TDeleteBidang = z.infer<typeof ODeleteBidang>;

export const OPagination = z.object({
  page: z._default(z.coerce.number(), 1),
  limit: z._default(z.coerce.number(), 10),
});
export type TPagination = z.infer<typeof OPagination>;

export const OSearchPagination = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});
export type TSearchPagination = z.infer<typeof OSearchPagination>;

export const OWilayah = z.object({
  daerahId: z.number(),
  desaId: z.number(),
  kelompokId: z.number(),
});
export type TWilayah = z.infer<typeof OWilayah>;

export type TPaginationMetadata = {
  page: number;
  total: number;
  itemPerPage: number;
};
