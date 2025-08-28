import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";
import { formatDate } from "~/utils/format";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Pengajar",
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "tanggalTugas",
    header: "Tanggal Tugas",
    cell: ({ row }) => formatDate(row.original.tanggalTugas),
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

export const genderOptions = ["Laki-laki", "Perempuan"];
export const statusOptions = [
  "Mubalig Tugasan",
  "Mubalig Setempat",
  "Asisten Pengjar",
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
  gender: z.string().check(z.minLength(1, "Required")),
  nama: z.string().check(z.minLength(1, "Required")),
  noTelepon: z.string().check(z.minLength(1, "Required")),
  pendidikan: z.string().check(z.minLength(1, "Required")),
  status: z.string().check(z.minLength(1, "Required")),
  tanggalLahir: z.string().check(z.minLength(1, "Required")),
  tempatLahir: z.string().check(z.minLength(1, "Required")),
  tanggalTugas: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
  gender: "",
  noTelepon: "",
  pendidikan: "",
  status: "",
  tanggalLahir: "",
  tempatLahir: "",
  tanggalTugas: "",
  foto: "",
  file: undefined,
});

export type Schema = z.infer<typeof schema>;
