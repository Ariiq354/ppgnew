import { z } from "zod/mini";
import {
  kelasGenerusEnum,
  kelasMudamudiEnum,
  pengajianEnum,
} from "~~/shared/enum";
import { OPagination } from "./common.dto";

export const OGenerusGenericList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  kelasPengajian: z.enum(pengajianEnum),
});
export type TGenerusGenericList = z.infer<typeof OGenerusGenericList>;

export const OGenerusBaseList = z.object({
  ...OPagination.def.shape,
  search: z.string(),
  desaId: z.optional(z.coerce.number()),
  kelompokId: z.optional(z.coerce.number()),
});
export type TGenerusBaseList = z.infer<typeof OGenerusBaseList>;

export const OGenerusList = z.object({
  ...OGenerusBaseList.def.shape,
  kelasPengajian: z.enum(kelasGenerusEnum),
});
export type TGenerusList = z.infer<typeof OGenerusList>;

export const OMudamudiList = z.object({
  ...OGenerusBaseList.def.shape,
  kelasPengajian: z.enum(kelasMudamudiEnum),
});
export type TMudamudiList = z.infer<typeof OMudamudiList>;
