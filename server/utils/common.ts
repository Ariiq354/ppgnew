export function convertToNameFormat(input: string) {
  const numberWords = [
    "nol",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];

  return input
    .replace(/\d/g, (digit) => numberWords[parseInt(digit)]!)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

export function titleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const kelasOptions = [
  "PAUD/TK",
  "SD 1",
  "SD 2",
  "SD 3",
  "SD 4",
  "SD 5",
  "SD 6",
  "SMP 7",
  "SMP 8",
  "SMP 9",
  "SMA 10",
  "SMA 11",
  "SMA 12",
  "Kuliah",
  "Bekerja / Tidak Bekerja",
];

const fixedKelas = new Set([
  "PAUD/TK",
  "SMA 12",
  "Kuliah",
  "Bekerja / Tidak Bekerja",
]);

export function getCurrentKelas(kelas: string, tanggalMasuk: Date) {
  if (fixedKelas.has(kelas)) {
    return kelas;
  }

  const startIndex = kelasOptions.indexOf(kelas);
  if (startIndex === -1) throw new Error("Kelas tidak valid");

  const today = new Date();

  let startYear = tanggalMasuk.getFullYear();
  if (tanggalMasuk.getMonth() + 1 >= 7) {
    startYear = tanggalMasuk.getFullYear();
  }

  let yearsPassed = today.getFullYear() - startYear;
  const isAfterJuly = today.getMonth() + 1 >= 7;
  if (!isAfterJuly) {
    yearsPassed -= 1;
  }

  const currentIndex = startIndex + Math.max(0, yearsPassed);

  for (let i = startIndex; i <= currentIndex; i++) {
    if (fixedKelas.has(kelasOptions[i]!)) {
      return kelasOptions[i];
    }
  }

  if (currentIndex >= kelasOptions.length - 1) {
    return kelasOptions[kelasOptions.length - 1];
  }

  return kelasOptions[currentIndex];
}
