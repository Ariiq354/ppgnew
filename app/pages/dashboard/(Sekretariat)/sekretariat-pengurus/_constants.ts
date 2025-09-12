import { UAvatar } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Pengurus",
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
    accessorKey: "bidang",
    header: "Bidang",
  },
  {
    accessorKey: "pendidikan",
    header: "Pendidikan Terakhir",
  },
];

export const bidangOptions = roles.map((value) => ({
  value,
  name: value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));

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
  bidang: z.enum(roles),
  nama: z.string().check(z.minLength(1, "Required")),
  pendidikan: z.string().check(z.minLength(1, "Required")),
  tanggalLahir: z.string().check(z.minLength(1, "Required")),
  tempatLahir: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  foto: "",
  file: undefined,
  bidang: "sekretariat",
  nama: "",
  pendidikan: "",
  tanggalLahir: "",
  tempatLahir: "",
});

export type Schema = z.infer<typeof schema>;
