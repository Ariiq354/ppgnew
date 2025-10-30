import { and, eq, like, or, Param, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import type { TGenerusBaseList } from "~~/server/utils/dto";

export async function getAllGenerusTahfidz(
  daerahId: number,
  { limit, page, search, desaId, kelompokId }: TGenerusBaseList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
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
    "Failed to get total count of Generus Tahfidz",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus Tahfidz",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllGenerusExportTahfidz(daerahId: number) {
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
          sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`
        )
      )
      .leftJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
  );
}

export async function getCountTahfidz(daerahId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`,
  ];

  return await tryCatch(
    "Failed to get count of Tahfidz",
    db.$count(generusTable, and(...conditions))
  );
}

export async function getAllTahfidzChart(daerahId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`,
  ];

  return await tryCatch(
    "Failed to get Tahfidz chart data",
    db
      .select({
        gender: generusTable.gender,
        kelasPengajian: generusTable.kelasPengajian,
      })
      .from(generusTable)
      .where(and(...conditions))
  );
}
