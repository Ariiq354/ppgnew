export type QueryType = Partial<{
  page: number;
  search: string;
  bulan: number;
  tahun: number;
  mingguKe: number;
  bidang: string;
}>;

export type DataReturn = {
  totalBiaya: number;
  id: number;
  biaya: number;
  bidang:
    | "kurikulum"
    | "keputrian"
    | "tahfidz"
    | "sekretariat"
    | "tenaga_pendidik"
    | "penggalang_dana"
    | "sarana_prasarana"
    | "kemandirian"
    | "bimbingan_konseling"
    | "olahraga_seni"
    | "kegiatan_muda_mudi";
  bulan:
    | "Januari"
    | "Februari"
    | "Maret"
    | "April"
    | "Mei"
    | "Juni"
    | "Juli"
    | "Agustus"
    | "September"
    | "Oktober"
    | "November"
    | "Desember";
  kegiatan: string;
  keterangan: string;
  mingguKe: number;
  peserta: string;
  tahun: number;
  status: "Pending" | "Aktif" | "Terlaksana";
};
