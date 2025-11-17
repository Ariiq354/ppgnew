import { z } from "zod/mini";
import { kelasGenerusEnum } from "~~/shared/enum";

export const columns = [
  {
    accessorKey: "nama",
    header: "Nama Pengajian",
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal Kegiatan",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  nama: z.enum(kelasGenerusEnum).check(z.minLength(1, "Required")),
  tanggal: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "PAUD",
  tanggal: "",
});

export type Schema = z.infer<typeof schema>;
