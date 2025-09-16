import { UAvatar } from "#components";
import type { TableColumn } from "@nuxt/ui";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Generus",
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
    accessorKey: "kelasSekolah",
    header: "Kelas Sekolah",
  },
  {
    accessorKey: "kelasPengajian",
    header: "Kelas Pengajian",
  },
  {
    accessorKey: "umur",
    header: "Umur",
    cell: ({ row }) => getAge(row.original.tanggalLahir),
  },
];

export const pengajianOptions = [
  "PAUD",
  "Cabe Rawit",
  "Praremaja",
  "Remaja",
  "Pranikah",
  "Usia Mandiri",
];

export const kelasOptions = [
  "PAUD/TK",
  "SD 1",
  "SD 2",
  "SD 3",
  "SD 4",
  "SD 5",
  "SD 6",
  "SMP 7",
  "SMP 8",
  "SMP 9",
  "SMA 10",
  "SMA 11",
  "SMA 12",
  "Kuliah",
  "Bekerja / Tidak Bekerja",
];
