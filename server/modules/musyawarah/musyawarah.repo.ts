import { and, eq, inArray, ilike, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { musyawarahTable } from "~~/server/database/schema/pengurus";
import type { TSearchPagination } from "~~/server/utils/dto/common.dto";

export async function getAllMusyawarah(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(ilike(musyawarahTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: musyawarahTable.id,
      nama: musyawarahTable.nama,
      tanggal: musyawarahTable.tanggal,
    })
    .from(musyawarahTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Musyawarah",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Musyawarah",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllMusyawarahExport(daerahId: number) {
  return await tryCatch(
    "Failed to export Musyawarah data",
    db
      .select({
        nama: musyawarahTable.nama,
        tanggal: musyawarahTable.tanggal,
      })
      .from(musyawarahTable)
      .where(eq(musyawarahTable.daerahId, daerahId))
  );
}

// Untuk Absensi
export async function getMusyawarahById(id: number) {
  const data = await tryCatch(
    "Failed to get Musyawarah by ID",
    db.query.musyawarahTable.findFirst({
      where: eq(musyawarahTable.id, id),
    })
  );

  return { data };
}

export async function getAllMusyawarahOptions(daerahId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahTable.daerahId, daerahId),
  ];

  const data = await tryCatch(
    "Failed to get all Musyawarah options",
    db
      .select({
        id: musyawarahTable.id,
        nama: musyawarahTable.nama,
        tanggal: musyawarahTable.tanggal,
      })
      .from(musyawarahTable)
      .where(and(...conditions))
  );

  return data;
}

// Untuk Absensi
export async function getCountMusyawarah(daerahId: number) {
  return await tryCatch(
    "Failed to get count of Musyawarah",
    db.$count(musyawarahTable, eq(musyawarahTable.daerahId, daerahId))
  );
}

export async function createMusyawarah(daerahId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Musyawarah",
    db.insert(musyawarahTable).values({
      ...data,
      daerahId,
    })
  );
}

export async function updateMusyawarah(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Musyawarah",
    db
      .update(musyawarahTable)
      .set(data)
      .where(
        and(eq(musyawarahTable.id, id), eq(musyawarahTable.daerahId, daerahId))
      )
  );
}

export async function deleteMusyawarah(daerahId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Musyawarah",
    db
      .delete(musyawarahTable)
      .where(
        and(
          inArray(musyawarahTable.id, id),
          eq(musyawarahTable.daerahId, daerahId)
        )
      )
  );
}
