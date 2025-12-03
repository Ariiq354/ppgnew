import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";
import { kelasGenerusEnum } from "~~/shared/enum";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Pengajian",
  },
  {
    accessorKey: "tanggal",
    header: () => h("div", { class: "text-center" }, "Tanggal Kegiatan"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.original.tanggal),
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  nama: z.enum(kelasGenerusEnum),
  tanggal: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string(),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "PAUD",
  tanggal: "",
  keterangan: "",
});

export type Schema = z.infer<typeof schema>;
