import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { roles } from "~~/shared/permission";

const statusMap = {
  Pending: { label: "pending", color: "warning" as const },
  Aktif: { label: "aktif", color: "info" as const },
  Terlaksana: { label: "terlaksana", color: "success" as const },
} as const;

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "bidang",
    header: "Bidang",
  },
  {
    accessorKey: "kegiatan",
    header: "Kegiatan",
  },
  {
    accessorKey: "peserta",
    header: "Peserta",
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
  {
    accessorKey: "biaya",
    header: "Biaya",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.getValue("biaya"));

      return formatted;
    },
    footer: ({ table }) => {
      const rows = table.getRowModel().rows;
      const totalBiaya = rows.length ? Number(rows[0]?.original.totalBiaya) : 0;

      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(totalBiaya);

      return `Total: ${formatted}`;
    },
  },
];

export const bidangOptions = roles.map((value) => ({
  value,
  name: value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));

const currentYear = new Date().getFullYear();
export const tahunOptions = [
  String(currentYear - 1),
  String(currentYear),
  String(currentYear + 1),
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

export const mingguOptions = [1, 2, 3, 4, 5];
