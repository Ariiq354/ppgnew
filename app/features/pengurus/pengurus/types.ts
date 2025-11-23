export type QueryType = Partial<{
  page: number;
  search: string;
}>;

export type DataReturn = {
  id: number;
  nama: string;
  pendidikan: string;
  bidang:
    | "sekretariat"
    | "kurikulum"
    | "tenaga_pendidik"
    | "penggalang_dana"
    | "sarana_prasarana"
    | "kemandirian"
    | "keputrian"
    | "bimbingan_konseling"
    | "olahraga_seni"
    | "kegiatan_muda_mudi"
    | "tahfidz";
  foto: string;
  tempatLahir: string;
  tanggalLahir: string;
};
