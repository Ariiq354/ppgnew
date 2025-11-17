import { and, eq, exists, inArray, notExists, type SQL } from "drizzle-orm";
import { sekolahEnum, type statusGenerusEnum } from "~~/shared/enum";
import { db } from "../database";
import { generusStatusTable, generusTable } from "../database/schema/generus";

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

const fixedKelas = new Set([
  "PAUD/TK",
  "SMA 12",
  "Kuliah",
  "Bekerja / Tidak Bekerja",
]);

export function getCurrentKelas(
  kelas: (typeof sekolahEnum)[number],
  tanggalMasuk: Date
): (typeof sekolahEnum)[number] {
  if (fixedKelas.has(kelas)) {
    return kelas;
  }

  const startIndex = sekolahEnum.indexOf(kelas);
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
    if (fixedKelas.has(sekolahEnum[i]!)) {
      return sekolahEnum[i]!;
    }
  }

  if (currentIndex >= sekolahEnum.length - 1) {
    return sekolahEnum[sekolahEnum.length - 1]!;
  }

  return sekolahEnum[currentIndex]!;
}

type StatusFilter = {
  include?: (typeof statusGenerusEnum)[number][];
  exclude?: (typeof statusGenerusEnum)[number][];
};

export function getGenerusByStatusSQL({
  include = [],
  exclude = [],
}: StatusFilter): SQL<unknown>[] {
  const conditions: SQL<unknown>[] = [];

  // Must have each included status
  for (const status of include) {
    conditions.push(
      exists(
        db
          .select()
          .from(generusStatusTable)
          .where(
            and(
              eq(generusStatusTable.generusId, generusTable.id),
              eq(generusStatusTable.status, status)
            )
          )
      )
    );
  }

  // Must NOT have any excluded status
  if (exclude.length > 0) {
    conditions.push(
      notExists(
        db
          .select()
          .from(generusStatusTable)
          .where(
            and(
              eq(generusStatusTable.generusId, generusTable.id),
              inArray(generusStatusTable.status, exclude)
            )
          )
      )
    );
  }

  return conditions;
}
