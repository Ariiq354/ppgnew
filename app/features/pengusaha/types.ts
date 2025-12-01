export type QueryType = Partial<{
  page: number;
  search: string;
}>;

export type DataReturn = {
  id: number;
  nama: string;
  bidangPekerjaan: string;
  namaUsaha: string;
  noTelepon: string;
};
