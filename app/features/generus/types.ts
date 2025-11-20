import type { statusGenerusEnum } from "~~/shared/enum";

export type QueryType = Partial<{
  page: number;
  search: string;
  kelasPengajian: string;
  desaId: number;
  kelompokId: number;
}>;

export type DataReturn = {
  kelasSekolah:
    | "PAUD/TK"
    | "SD 1"
    | "SD 2"
    | "SD 3"
    | "SD 4"
    | "SD 5"
    | "SD 6"
    | "SMP 7"
    | "SMP 8"
    | "SMP 9"
    | "SMA 10"
    | "SMA 11"
    | "SMA 12"
    | "Kuliah"
    | "Bekerja / Tidak Bekerja";
  id: number;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string | null;
  gender: "Laki-laki" | "Perempuan";
  noTelepon: string;
  kelasPengajian:
    | "PAUD"
    | "Cabe Rawit"
    | "Praremaja"
    | "Remaja"
    | "Pranikah"
    | "Usia Mandiri";
  namaOrtu: string;
  status: (typeof statusGenerusEnum)[number][];
  noTeleponOrtu: string;
  foto: string;
  namaKelompok: string;
};
