import { and, eq, inArray, ilike, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasGpsTable } from "~~/server/database/schema/desa";
import type { TKelas, TNamaTanggal } from "~~/server/utils/dto/kelas.dto";

export async function getAllKelasGps(
  desaId: number,
  { limit, page, search, bulan, tahun }: TKelas
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasGpsTable.desaId, desaId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(ilike(kelasGpsTable.nama, searchCondition)));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasGpsTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasGpsTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasGpsTable.id,
      nama: kelasGpsTable.nama,
      tanggal: kelasGpsTable.tanggal,
    })
    .from(kelasGpsTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Kelas Gps",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Kelas Gps",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllKelasGpsExport(desaId: number) {
  return await tryCatch(
    "Failed to export Kelas Gps data",
    db
      .select({
        nama: kelasGpsTable.nama,
        tanggal: kelasGpsTable.tanggal,
      })
      .from(kelasGpsTable)
      .where(eq(kelasGpsTable.desaId, desaId))
  );
}

export async function getKelasGpsById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Gps By Id",
    db.query.kelasGpsTable.findFirst({
      where: eq(kelasGpsTable.id, id),
    })
  );

  return { data };
}

export async function getAllKelasGpsOptions(desaId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasGpsTable.desaId, desaId),
  ];

  const data = await tryCatch(
    "Failed to get all Kelas Gps options",
    db
      .select({
        id: kelasGpsTable.id,
        nama: kelasGpsTable.nama,
        tanggal: kelasGpsTable.tanggal,
      })
      .from(kelasGpsTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function getCountKelasGps(desaId: number) {
  return await tryCatch(
    "Failed to get count of Kelas Gps",
    db.$count(kelasGpsTable, and(eq(kelasGpsTable.desaId, desaId)))
  );
}

export async function createKelasGps(desaId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Kelas Gps",
    db.insert(kelasGpsTable).values({
      ...data,
      desaId,
    })
  );
}

export async function updateKelasGps(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Gps",
    db
      .update(kelasGpsTable)
      .set(data)
      .where(and(eq(kelasGpsTable.id, id), eq(kelasGpsTable.desaId, desaId)))
  );
}

export async function deleteKelasGps(desaId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Gps",
    db
      .delete(kelasGpsTable)
      .where(
        and(inArray(kelasGpsTable.id, id), eq(kelasGpsTable.desaId, desaId))
      )
  );
}
