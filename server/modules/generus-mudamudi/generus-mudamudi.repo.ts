import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  generusStatusTable,
  generusTable,
} from "~~/server/database/schema/generus";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import { getGenerusByStatusSQL } from "~~/server/utils/common";
import { exclude } from "~~/shared/enum";

export async function getAllGenerusMudamudi(
  daerahId: number,
  { limit, page, search, kelasPengajian, desaId, kelompokId }: TMudamudiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    inArray(generusTable.kelasPengajian, [
      "Remaja",
      "Pranikah",
      "Usia Mandiri",
    ]),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  if (desaId) {
    conditions.push(eq(generusTable.desaId, desaId));
  }
  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      tempatLahir: generusTable.tempatLahir,
      tanggalLahir: generusTable.tanggalLahir,
      kelasSekolah: generusTable.kelasSekolah,
      gender: generusTable.gender,
      noTelepon: generusTable.noTelepon,
      status: sql<
        string[]
      >`COALESCE(ARRAY_AGG(${generusStatusTable.status}), '{}')`,
      kelasPengajian: generusTable.kelasPengajian,
      namaOrtu: generusTable.namaOrtu,
      noTeleponOrtu: generusTable.noTeleponOrtu,
      tanggalMasukKelas: generusTable.tanggalMasukKelas,
      foto: generusTable.foto,
    })
    .from(generusTable)
    .leftJoin(
      generusStatusTable,
      eq(generusTable.id, generusStatusTable.generusId)
    )
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus Mudamudi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus Mudamudi",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllMudamudiExclude(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TMudamudiAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
    })
    .from(generusTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Mudamudi Absensi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Mudamudi Absensi",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAllGenerusExportMudamudi(daerahId: number) {
  return await tryCatch(
    "Failed to export Generus GPS data by Desa",
    db
      .select({
        id: generusTable.id,
        nama: generusTable.nama,
        tempatLahir: generusTable.tempatLahir,
        tanggalLahir: generusTable.tanggalLahir,
        kelasSekolah: generusTable.kelasSekolah,
        gender: generusTable.gender,
        noTelepon: generusTable.noTelepon,
        kelasPengajian: generusTable.kelasPengajian,
        namaOrtu: generusTable.namaOrtu,
        noTeleponOrtu: generusTable.noTeleponOrtu,
        tanggalMasukKelas: generusTable.tanggalMasukKelas,
        foto: generusTable.foto,
        namaKelompok: kelompokTable.name,
      })
      .from(generusTable)
      .where(
        and(
          eq(generusTable.daerahId, daerahId),
          inArray(generusTable.kelasPengajian, [
            "Remaja",
            "Pranikah",
            "Usia Mandiri",
          ])
        )
      )
      .leftJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
  );
}

export async function getGenerusMudamudiKelasPengajianExclude(
  daerahId: number
) {
  return await tryCatch(
    "Failed to get Generus Absensi Exclude",
    db
      .select({
        id: generusTable.id,
        kelasPengajian: generusTable.kelasPengajian,
      })
      .from(generusTable)
      .where(
        and(
          eq(generusTable.daerahId, daerahId),
          inArray(generusTable.kelasPengajian, [
            "Remaja",
            "Pranikah",
            "Usia Mandiri",
          ]),
          ...getGenerusByStatusSQL({ exclude: [...exclude] })
        )
      )
  );
}

export async function getAllMudamudiChart(daerahId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    inArray(generusTable.kelasPengajian, [
      "Remaja",
      "Pranikah",
      "Usia Mandiri",
    ]),
  ];

  return await tryCatch(
    "Failed to get Mudamudi chart data",
    db
      .select({
        gender: generusTable.gender,
        kelasPengajian: generusTable.kelasPengajian,
      })
      .from(generusTable)
      .where(and(...conditions))
  );
}

export async function getCountMudamudiByKelasPengajian(
  daerahId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
  ];

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  return await tryCatch(
    "Failed to get Count mudamudi",
    db.$count(generusTable, and(...conditions))
  );
}
