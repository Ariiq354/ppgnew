import { roles } from "~~/shared/permission";

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
    header: "Bulan",
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

export const bidangOptions = roles.map((value) => ({
  value,
  name: value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));

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
