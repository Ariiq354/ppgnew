import type { TableColumn } from "@nuxt/ui";
import type { kelasGenerusEnum } from "~~/shared/enum";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Generus",
  },
  {
    accessorKey: "kehadiran",
    header: "Kehadiran",
    cell: ({ row }) => `${row.original.kehadiran}%`,
  },
  {
    accessorKey: "hadir",
    header: "Hadir",
  },
  {
    accessorKey: "izin",
    header: "Izin",
  },
  {
    accessorKey: "tanpaKeterangan",
    header: "Tanpa Keterangan",
  },
];

export type QueryType = Partial<{
  page: number;
  search: string;
  kelasPengajian: (typeof kelasGenerusEnum)[number];
  tahun: number;
  kelompokId: number;
  bulan: number;
}>;
