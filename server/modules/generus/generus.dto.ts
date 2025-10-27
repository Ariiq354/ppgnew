import { z } from "zod/mini";

export const OGenerusCreate = z.object({
  nama: z.string(),
  noTelepon: z.string(),
  noTeleponOrtu: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.iso.date(),
  gender: z.string(),
  namaOrtu: z.string(),
  kelasSekolah: z.string(),
  kelasPengajian: z.string(),
  foto: z.string(),
  status: z.array(z.string()),
});

export type TGenerusCreate = z.infer<typeof OGenerusCreate>;
