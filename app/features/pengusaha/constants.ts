import { z } from "zod/mini";

export const columns = [
  {
    accessorKey: "nama",
    header: "Nama Pengusaha",
  },
  {
    accessorKey: "bidangPekerjaan",
    header: "Bidang",
  },
  {
    accessorKey: "namaUsaha",
    header: "Bidang",
  },
  {
    accessorKey: "noTelepon",
    header: "Bidang",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  nama: z.string().check(z.minLength(1, "Required")),
  bidangPekerjaan: z.string().check(z.minLength(1, "Required")),
  namaUsaha: z.string().check(z.minLength(1, "Required")),
  noTelepon: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
  namaUsaha: "",
  bidangPekerjaan: "",
  noTelepon: "",
});

export type Schema = z.infer<typeof schema>;
