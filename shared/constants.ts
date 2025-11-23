import { bidangEnum } from "./enum";

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

export const mingguOptions = [1, 2, 3, 4, 5];

export const bidangOptions = bidangEnum.map((value) => ({
  value,
  name: value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));
