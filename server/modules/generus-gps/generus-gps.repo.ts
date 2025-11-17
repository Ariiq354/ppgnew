import { and, eq, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  generusStatusTable,
  generusTable,
} from "~~/server/database/schema/generus";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import { getGenerusByStatusSQL } from "~~/server/utils/common";
import type { TGenerusBaseList } from "~~/server/utils/dto/generus.dto";
import { exclude } from "~~/shared/enum";

export async function getAllGenerusGPS(
  daerahId: number,
  { limit, page, search, desaId, kelompokId }: TGenerusBaseList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    eq(generusStatusTable.status, "GPS"),
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
      eq(generusStatusTable.generusId, generusTable.id)
    )
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus GPS",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus GPS",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllGpsExclude(
  desaId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.desaId, desaId),
    ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] }),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
    })
    .from(generusTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of GPS Absensi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of GPS Absensi",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAllGenerusExportGps(desaId: number) {
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
          eq(generusTable.desaId, desaId),
          ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] })
        )
      )
      .leftJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
  );
}

export async function getCountGpsExclude(desaId: number) {
  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] })
      )
    )
  );
}
