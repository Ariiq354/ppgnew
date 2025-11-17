import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTahfidzTable } from "~~/server/database/schema/tahfidz";
import type { TNamaTanggal } from "~~/server/utils/dto/kelas.dto";

export async function getAllKelasTahfidz(
  desaId: number,
  { limit, page, search, bulan, tahun }: TKelas
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTahfidzTable.desaId, desaId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasTahfidzTable.nama, searchCondition)));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasTahfidzTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasTahfidzTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasTahfidzTable.id,
      nama: kelasTahfidzTable.nama,
      tanggal: kelasTahfidzTable.tanggal,
    })
    .from(kelasTahfidzTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Kelas",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Kelas",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllKelasTahfidzExport(desaId: number) {
  return await tryCatch(
    "Failed to export Kelas Tahfidz data",
    db
      .select({
        nama: kelasTahfidzTable.nama,
        tanggal: kelasTahfidzTable.tanggal,
      })
      .from(kelasTahfidzTable)
      .where(eq(kelasTahfidzTable.desaId, desaId))
  );
}

export async function getKelasTahfidzById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Tahfidz By Id",
    db.query.kelasTahfidzTable.findFirst({
      where: eq(kelasTahfidzTable.id, id),
    })
  );

  return { data };
}

export async function getAllKelasTahfidzOptions(desaId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTahfidzTable.desaId, desaId),
  ];

  const data = await tryCatch(
    "Failed to get all Kelas Tahfidz options",
    db
      .select({
        id: kelasTahfidzTable.id,
        nama: kelasTahfidzTable.nama,
        tanggal: kelasTahfidzTable.tanggal,
      })
      .from(kelasTahfidzTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function getCountKelasTahfidz(desaId: number) {
  return await tryCatch(
    "Failed to get count of Kelas Tahfidz",
    db.$count(kelasTahfidzTable, and(eq(kelasTahfidzTable.desaId, desaId)))
  );
}

export async function createKelasTahfidz(desaId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Kelas Tahfidz",
    db.insert(kelasTahfidzTable).values({
      ...data,
      desaId,
    })
  );
}

export async function updateKelasTahfidz(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Tahfidz",
    db
      .update(kelasTahfidzTable)
      .set(data)
      .where(
        and(eq(kelasTahfidzTable.id, id), eq(kelasTahfidzTable.desaId, desaId))
      )
  );
}

export async function deleteKelasTahfidz(desaId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Tahfidz",
    db
      .delete(kelasTahfidzTable)
      .where(
        and(
          inArray(kelasTahfidzTable.id, id),
          eq(kelasTahfidzTable.desaId, desaId)
        )
      )
  );
}
