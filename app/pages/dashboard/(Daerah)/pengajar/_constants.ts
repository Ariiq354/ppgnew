import { UAvatar } from "#components";
import type { TableColumn } from "@nuxt/ui";

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
];

export type PengajarReturnType = {
  id: number;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  pendidikan: string;
  gender: string;
  noTelepon: string;
  status: string;
  tanggalTugas: string;
  foto: string;
  namaKelompok: string | null;
};
