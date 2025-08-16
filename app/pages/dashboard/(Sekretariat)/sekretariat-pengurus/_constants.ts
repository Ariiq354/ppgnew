import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const columns = [
  {
    accessorKey: "nama",
    header: "Nama Pengurus",
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
  bidang: z.enum(roles),
  nama: z.string().check(z.minLength(1, "Required")),
  pendidikan: z.string().check(z.minLength(1, "Required")),
  tanggalLahir: z.string().check(z.minLength(1, "Required")),
  tempatLahir: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  foto: "",
  bidang: "sekretariat",
  nama: "",
  pendidikan: "",
  tanggalLahir: "",
  tempatLahir: "",
});

export type Schema = z.infer<typeof schema>;
