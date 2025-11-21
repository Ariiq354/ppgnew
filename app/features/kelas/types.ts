export type QueryType = Partial<{
  page: number;
  search: string;
  nama: string;
  tahun: number;
  bulan: number;
}>;

export type DataReturn = {
  id: number;
  nama: "PAUD" | "Cabe Rawit" | "Praremaja" | "Muda-mudi";
  keterangan: string;
  tanggal: string;
};
