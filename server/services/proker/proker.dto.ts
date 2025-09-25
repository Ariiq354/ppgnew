import { z } from "zod/mini";
import { z as zo } from "zod";
import { OPagination } from "~~/server/utils/dto";
import { roles } from "~~/shared/permission";

const bulanOptions = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

export const OProkerCreate = z.object({
  kegiatan: z.string(),
  peserta: z.string(),
  bulan: z.enum(bulanOptions),
  tahun: z.number(),
  biaya: z.number(),
  keterangan: z.string(),
  mingguKe: z.number(),
  bidang: z.enum(roles),
  status: z.enum(["Aktif", "Pending", "Terlaksana"]),
});

export type TProkerCreate = z.infer<typeof OProkerCreate>;

export const OProkerList = z.object({
  ...OPagination.def.shape,
  bidang: zo.preprocess(
    (val) => (val === "" ? undefined : val),
    z.optional(z.enum(roles))
  ),
  search: z.string(),
  tahun: z.optional(z.coerce.number()),
  bulan: zo.preprocess(
    (val) => (val === "" ? undefined : val),
    z.optional(z.enum(bulanOptions))
  ),
  mingguKe: z.optional(z.coerce.number()),
});

export type TProkerList = z.infer<typeof OProkerList>;
