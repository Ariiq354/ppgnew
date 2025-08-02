import { z } from "zod/mini";
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
  bidang: z.enum(roles),
  search: z.string(),
});

export type TProkerList = z.infer<typeof OProkerList>;
