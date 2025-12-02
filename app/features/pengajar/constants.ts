import { UAvatar } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";
import { genderEnum, statusPengajarEnum } from "~~/shared/enum";

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
    header: () => h("div", { class: "text-center" }, "Jenis Kelamin"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.gender),
  },
  {
    accessorKey: "namaKelompok",
    header: () => h("div", { class: "text-center" }, "Nama Kelompok"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.original.namaKelompok),
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: "text-center" }, "Status"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.status),
  },
  {
    accessorKey: "noTelepon",
    header: () => h("div", { class: "text-center" }, "No Telepon"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.original.noTelepon),
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  foto: z.string(),
  file: z.optional(
    z
      .file()
      .check(
        z.maxSize(5_000_000),
        z.mime(["image/png", "image/jpeg", "image/webp"])
      )
  ),
  gender: z.enum(genderEnum),
  nama: z.string().check(z.minLength(1, "Required")),
  noTelepon: z.string().check(z.minLength(1, "Required")),
  pendidikan: z.string().check(z.minLength(1, "Required")),
  status: z.enum(statusPengajarEnum),
  tanggalLahir: z.nullable(z.string().check(z.minLength(1, "Required"))),
  tempatLahir: z.string().check(z.minLength(1, "Required")),
  tanggalTugas: z.nullable(z.string().check(z.minLength(1, "Required"))),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
  gender: "Laki-laki",
  noTelepon: "",
  pendidikan: "",
  status: "Asisten Pengajar",
  tanggalLahir: "",
  tempatLahir: "",
  tanggalTugas: "",
  foto: "",
  file: undefined,
});

export type Schema = z.infer<typeof schema>;
