export const columns = [
  {
    accessorKey: "bidang",
    header: "Bidang",
  },
  {
    accessorKey: "kegiatan",
    header: "Kegiatan",
  },
  {
    accessorKey: "peserta",
    header: "Peserta",
  },
  {
    accessorKey: "biaya",
    header: "Biaya",
  },
  {
    accessorKey: "mingguKe",
    header: "Minggu",
  },
  {
    accessorKey: "bulan",
    header: "Bulan Kegiatan",
  },
  {
    accessorKey: "tahun",
    header: "Tahun",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const currentYear = new Date().getFullYear();
export const tahunOptions = [
  String(currentYear - 1),
  String(currentYear),
  String(currentYear + 1),
];

export const bulanOptions = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const mingguOptions = [1, 2, 3, 4, 5];
