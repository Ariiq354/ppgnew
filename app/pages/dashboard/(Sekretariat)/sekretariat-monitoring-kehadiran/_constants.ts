import type { TableColumn } from "@nuxt/ui";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Pengurus",
  },
  {
    accessorKey: "bidang",
    header: "Bidang",
  },
  {
    accessorKey: "kehadiran",
    header: "Kehadiran",
    cell: ({ row }) => String(row.original.kehadiran) + "%",
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
