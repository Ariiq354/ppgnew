import { z } from "zod/mini";
import { bidangEnum } from "~~/shared/enum";

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
  bidang: z.enum(bidangEnum),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
  tanggal: "",
  bidang: "kemandirian",
});

export type Schema = z.infer<typeof schema>;
