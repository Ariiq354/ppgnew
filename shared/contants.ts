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
] as const;

export const statusOptions = ["Pending", "Aktif", "Terlaksana"];

export const statusPengajarOptions = [
  "Mubalig Tugasan",
  "Mubalig Setempat",
  "Asisten Pengajar",
];

export const genderOptions = ["Laki-laki", "Perempuan"];

export const pengajianOptions = [
  "PAUD",
  "Cabe Rawit",
  "Praremaja",
  "Remaja",
  "Pranikah",
  "Usia Mandiri",
];

export const bulanFilterOptions = [
  { name: "Januari", value: 1 },
  { name: "Februari", value: 2 },
  { name: "Maret", value: 3 },
  { name: "April", value: 4 },
  { name: "Mei", value: 5 },
  { name: "Juni", value: 6 },
  { name: "Juli", value: 7 },
  { name: "Agustus", value: 8 },
  { name: "September", value: 9 },
  { name: "Oktober", value: 10 },
  { name: "November", value: 11 },
  { name: "Desember", value: 12 },
];

const currentYear = new Date().getFullYear();
export const tahunOptions = [
  String(currentYear - 1),
  String(currentYear),
  String(currentYear + 1),
];

export const exclude = ["Pindah", "Mondok", "Tugas"];

export const daerahKelas = ["Muda-mudi", "Usia Mandiri"];
