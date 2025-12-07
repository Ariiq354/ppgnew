import { UAvatar } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";
import { genderEnum, pengajianEnum } from "~~/shared/enum";

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
    header: () => h("div", { class: "text-center" }, "Jenis Kelamin"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.gender),
  },
  {
    accessorKey: "kelasSekolah",
    header: () => h("div", { class: "text-center" }, "Kelas Sekolah"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.original.kelasSekolah),
  },
  {
    accessorKey: "kelasPengajian",
    header: () => h("div", { class: "text-center" }, "Kelas Pengajian"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.original.kelasPengajian),
  },
  {
    accessorKey: "umur",
    header: () => h("div", { class: "text-center" }, "Umur"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, getAge(row.original.tanggalLahir)),
  },
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

export const statusOptions = [
  "GPS",
  "Tahfidz",
  "Pindah",
  "Mondok",
  "Tugas",
  "Sudah Menikah",
];

export const schema = z.object({
  id: z.optional(z.number()),
  nama: z.string().check(z.minLength(1, "Required")),
  noTelepon: z.string().check(z.minLength(1, "Required")),
  noTeleponOrtu: z.string().check(z.minLength(1, "Required")),
  tempatLahir: z.string().check(z.minLength(1, "Required")),
  tanggalLahir: z.nullable(z.string().check(z.minLength(1, "Required"))),
  gender: z.enum(genderEnum),
  namaOrtu: z.string().check(z.minLength(1, "Required")),
  kelasSekolah: z.string().check(z.minLength(1, "Required")),
  kelasPengajian: z.enum(pengajianEnum),
  status: z.array(z.string()),
  foto: z.string(),
  file: z.optional(
    z
      .file()
      .check(
        z.maxSize(5_000_000),
        z.mime(["image/png", "image/jpeg", "image/webp"])
      )
  ),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
  noTelepon: "",
  noTeleponOrtu: "",
  tempatLahir: "",
  tanggalLahir: "",
  gender: "Laki-laki",
  namaOrtu: "",
  kelasSekolah: "",
  kelasPengajian: "PAUD",
  status: [],
  foto: "",
  file: undefined,
});

export type Schema = z.infer<typeof schema>;

export type QueryType = Partial<{
  page: number;
  search: string;
  kelasPengajian: string;
}>;
