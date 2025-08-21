import { z } from "zod/mini";
import { roles } from "~~/shared/permission";

export const columns = [
  {
    accessorKey: "nama",
    header: "Nama Musyawarah",
  },
  {
    accessorKey: "tanggal",
    header: "Kegiatan",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  nama: z.string().check(z.minLength(1, "Required")),
  tanggal: z.string().check(z.minLength(1, "Required")),
  bidang: z.enum(roles),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
  tanggal: "",
  bidang: "sekretariat",
});

export type Schema = z.infer<typeof schema>;
