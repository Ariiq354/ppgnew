import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";
import { bidangEnum, bulanEnum } from "~~/shared/enum";

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
    accessorKey: "bidang",
    header: "Bidang",
    cell: ({ row }) =>
      row.original.bidang
        .split("_")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
  },
  {
    accessorKey: "mingguKe",
    header: () => h("div", { class: "text-center" }, "Minggu"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.original.mingguKe),
  },
  {
    accessorKey: "bulan",
    header: () => h("div", { class: "text-center" }, "Bulan"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.bulan),
  },
  {
    accessorKey: "tahun",
    header: () => h("div", { class: "text-center" }, "Tahun"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.tahun),
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
    header: () => h("div", { class: "text-right" }, "Biaya"),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.getValue("biaya"));

      return h("div", { class: "text-right" }, formatted);
    },
    footer: ({ table }) => {
      const rows = table.getRowModel().rows;
      const totalBiaya = rows.length ? Number(rows[0]?.original.totalBiaya) : 0;

      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(totalBiaya);

      return h("div", { class: "text-right" }, `Total: ${formatted}`);
    },
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  kegiatan: z.string().check(z.minLength(1, "Required")),
  peserta: z.string().check(z.minLength(1, "Required")),
  tahun: z.number().check(z.minimum(1, "Required")),
  bulan: z.enum(bulanEnum),
  mingguKe: z
    .number()
    .check(z.minimum(1, "Minngu minimal 1"), z.maximum(5, "Minggu maximal 5")),
  biaya: z.number(),
  keterangan: z.string().check(z.minLength(1, "Required")),
  bidang: z.enum(bidangEnum),
  status: z.enum(["Pending", "Aktif", "Terlaksana"]),
});

export const getInitialFormData = (
  bidang: (typeof bidangEnum)[number]
): Schema => ({
  id: undefined,
  biaya: 0,
  bidang,
  bulan: "Januari",
  kegiatan: "",
  keterangan: "",
  peserta: "",
  tahun: 0,
  mingguKe: 0,
  status: "Pending",
});

export type Schema = z.infer<typeof schema>;
