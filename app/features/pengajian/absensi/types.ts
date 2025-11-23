export type QueryType = Partial<{
  page: number;
  search: string;
}>;

export type DataReturn = {
  id: number;
  jamaahId: number;
  detail: string;
  keterangan: "Hadir" | "Izin" | "Tanpa Keterangan";
};
