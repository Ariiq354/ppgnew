export type QueryType = Partial<{
  page: number;
  search: string;
}>;

export type DataReturn = {
  id: number;
  pengurusId: number;
  detail: string;
  keterangan: "Hadir" | "Izin" | "Tanpa Keterangan";
};
