import type { TableColumn } from "@nuxt/ui";
import type { kelasGenerusEnum } from "~~/shared/enum";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Generus",
  },
  {
    accessorKey: "kehadiran",
    header: () => h("div", { class: "text-center" }, "Kehadiran"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, `${row.original.kehadiran}%`),
  },
  {
    accessorKey: "hadir",
    header: () => h("div", { class: "text-center" }, "Hadir"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.hadir),
  },
  {
    accessorKey: "izin",
    header: () => h("div", { class: "text-center" }, "Izin"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.izin),
  },
  {
    accessorKey: "tanpaKeterangan",
    header: () => h("div", { class: "text-center" }, "Tanpa Keterangan"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.original.tanpaKeterangan),
  },
];

export type QueryType = Partial<{
  page: number;
  search: string;
  kelasPengajian: (typeof kelasGenerusEnum)[number];
  tahun: number;
  bulan: number;
}>;
