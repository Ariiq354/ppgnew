import { z } from "zod/mini";
import { z as zo } from "zod";
import { OPagination } from "~~/server/utils/dto/common.dto";
import { bidangEnum, bulanEnum } from "~~/shared/enum";

export const OProkerCreate = z.object({
  kegiatan: z.string(),
  peserta: z.string(),
  bulan: z.enum(bulanEnum),
  tahun: z.number(),
  biaya: z.number(),
  keterangan: z.string(),
  mingguKe: z.number(),
  bidang: z.enum(bidangEnum),
  status: z.enum(["Aktif", "Pending", "Terlaksana"]),
});

export type TProkerCreate = z.infer<typeof OProkerCreate>;

export const OProkerList = z.object({
  ...OPagination.def.shape,
  bidang: zo.preprocess(
    (val) => (val === "" ? undefined : val),
    z.optional(z.enum(bidangEnum))
  ),
  search: z.string(),
  tahun: z.optional(z.coerce.number()),
  bulan: zo.preprocess(
    (val) => (val === "" ? undefined : val),
    z.optional(z.enum(bulanEnum))
  ),
  mingguKe: z.optional(z.coerce.number()),
});

export type TProkerList = z.infer<typeof OProkerList>;
