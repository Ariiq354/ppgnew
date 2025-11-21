import { z } from "zod/mini";
import { kelasMudamudiEnum } from "~~/shared/enum";

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
  nama: z.enum(kelasMudamudiEnum),
  tanggal: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "Muda-mudi",
  tanggal: "",
});

export type Schema = z.infer<typeof schema>;

export type QueryType = Partial<{
  page: number;
  search: string;
  nama: string;
  tahun: number;
  bulan: string;
}>;
