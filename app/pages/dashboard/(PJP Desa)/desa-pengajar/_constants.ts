import { UAvatar } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { formatDate } from "~/utils/format";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Pengajar",
    cell: ({ row }) => {
      return h("div", { class: "flex items-center gap-2" }, [
        h(UAvatar, {
          src: row.original.foto,
          alt: row.original.nama,
        }),
        row.original.nama,
      ]);
    },
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "tanggalTugas",
    header: "Tanggal Tugas",
    cell: ({ row }) => formatDate(row.getValue("tanggalTugas")),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "noTelepon",
    header: "No. Telepon",
  },
  {
    accessorKey: "namaKelompok",
    header: "Kelompok",
  },
];

export const statusOptions = [
  "Mubalig Tugasan",
  "Mubalig Setempat",
  "Asisten Pengajar",
];
