import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import type { TGenerusList } from "~~/server/utils/dto";

export async function getAllGenerusKeputrian(
  daerahId: number,
  { limit, page, search, kelasPengajian, desaId, kelompokId }: TGenerusList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    eq(generusTable.gender, "Perempuan"),
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

  if (kelasPengajian) {
    conditions.push(eq(generusTable.kelasPengajian, kelasPengajian));
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
      status: generusTable.status,
      kelasPengajian: generusTable.kelasPengajian,
      namaOrtu: generusTable.namaOrtu,
      noTeleponOrtu: generusTable.noTeleponOrtu,
      tanggalMasukKelas: generusTable.tanggalMasukKelas,
      foto: generusTable.foto,
    })
    .from(generusTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus Keputrian",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus Keputrian",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllGenerusExportKeputrian(daerahId: number) {
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
        status: generusTable.status,
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
          eq(generusTable.gender, "Perempuan"),
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
