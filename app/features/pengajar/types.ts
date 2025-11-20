export type QueryType = Partial<{
  page: number;
  search: string;
  status: string;
  desaId: number;
  kelompokId: number;
}>;

export type DataReturn = {
  id: number;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string | null;
  pendidikan: string;
  gender: "Laki-laki" | "Perempuan";
  noTelepon: string;
  status: "Mubalig Tugasan" | "Mubalig Setempat" | "Asisten Pengajar";
  tanggalTugas: string | null;
  foto: string;
  namaKelompok: string;
};
