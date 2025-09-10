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
    accessorKey: "absensi",
    header: "Absensi",
  },
  {
    accessorKey: "keterangan",
    header: "Catatan",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  bidang: z.enum(roles),
  laporan: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  bidang: "sekretariat",
  laporan: "",
  keterangan: "",
});

export type Schema = z.infer<typeof schema>;
