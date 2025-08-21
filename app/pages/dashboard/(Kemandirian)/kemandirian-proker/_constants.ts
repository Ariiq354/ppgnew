import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const columns = [
  {
    accessorKey: "kegiatan",
    header: "Kegiatan",
  },
  {
    accessorKey: "peserta",
    header: "Peserta",
  },
  {
    accessorKey: "biaya",
    header: "Biaya",
  },
  {
    accessorKey: "mingguKe",
    header: "Minggu",
  },
  {
    accessorKey: "bulan",
    header: "Bulan",
  },
  {
    accessorKey: "tahun",
    header: "Tahun",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const bulanOptions = [
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
];

export const statusOptions = ["Pending", "Aktif", "Terlaksana"];

export const schema = z.object({
  id: z.optional(z.number()),
  kegiatan: z.string().check(z.minLength(1, "Required")),
  peserta: z.string().check(z.minLength(1, "Required")),
  tahun: z.number().check(z.minimum(1, "Required")),
  bulan: z.string().check(z.minLength(1, "Required")),
  mingguKe: z
    .number()
    .check(z.minimum(1, "Minngu minimal 1"), z.maximum(5, "Minggu maximal 5")),
  biaya: z.number(),
  keterangan: z.string().check(z.minLength(1, "Required")),
  bidang: z.enum(roles),
  status: z.enum(["Pending", "Aktif", "Terlaksana"]),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  biaya: 0,
  bidang: "kemandirian",
  bulan: "",
  kegiatan: "",
  keterangan: "",
  peserta: "",
  tahun: 0,
  mingguKe: 0,
  status: "Pending",
});

export type Schema = z.infer<typeof schema>;
