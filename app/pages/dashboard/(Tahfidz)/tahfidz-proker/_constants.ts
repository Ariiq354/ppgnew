import { z } from "zod/mini";
import { roles } from "~~/shared/permission";
import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";

const statusMap = {
  Pending: { label: "pending", color: "warning" as const },
  Aktif: { label: "aktif", color: "info" as const },
  Terlaksana: { label: "terlaksana", color: "success" as const },
} as const;

export const columns: TableColumn<any>[] = [
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
    cell: ({ row }) => {
      const status =
        statusMap[row.getValue("status") as keyof typeof statusMap];

      if (!status) return row.getValue("status");

      return h(
        UBadge,
        { class: "capitalize rounded-full", color: status.color },
        () => status.label
      );
    },
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
  bidang: "tahfidz",
  bulan: "",
  kegiatan: "",
  keterangan: "",
  peserta: "",
  tahun: 0,
  mingguKe: 0,
  status: "Pending",
});

export type Schema = z.infer<typeof schema>;
