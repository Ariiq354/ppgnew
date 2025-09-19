import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { musyawarahTable } from "~~/server/database/schema/pengurus";
import type { TNamaTanggal, TSearchPagination } from "~~/server/utils/dto";

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

    conditions.push(or(like(musyawarahTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: musyawarahTable.id,
      nama: musyawarahTable.nama,
      tanggal: musyawarahTable.tanggal,
    })
    .from(musyawarahTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Musyawarah", error);
    throw InternalError;
  }
}

export async function getAllMusyawarahExport(daerahId: number) {
  return await db
    .select({
      nama: musyawarahTable.nama,
      tanggal: musyawarahTable.tanggal,
    })
    .from(musyawarahTable)
    .where(eq(musyawarahTable.daerahId, daerahId));
}

export async function getMusyawarahById(id: number) {
  const data = await db.query.musyawarahTable.findFirst({
    where: eq(musyawarahTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Musyawarah By Id", error);
    throw InternalError;
  }
}

export async function getAllMusyawarahOptions(daerahId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahTable.daerahId, daerahId),
  ];

  const data = await db
    .select({
      id: musyawarahTable.id,
      nama: musyawarahTable.nama,
      tanggal: musyawarahTable.tanggal,
    })
    .from(musyawarahTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Musyawarah", error);
    throw InternalError;
  }
}

export async function getCountMusyawarah(daerahId: number) {
  try {
    return await db.$count(
      musyawarahTable,
      eq(musyawarahTable.daerahId, daerahId)
    );
  } catch (error) {
    console.error("Failed to get Count Musyawarah", error);
    throw InternalError;
  }
}

export async function createMusyawarah(daerahId: number, data: TNamaTanggal) {
  try {
    return await db.insert(musyawarahTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Musyawarah", error);
    throw InternalError;
  }
}

export async function updateMusyawarah(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(musyawarahTable)
      .set(data)
      .where(
        and(eq(musyawarahTable.id, id), eq(musyawarahTable.daerahId, daerahId))
      );
  } catch (error) {
    console.error("Failed to Update Musyawarah", error);
    throw InternalError;
  }
}

export async function deleteMusyawarah(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(musyawarahTable)
      .where(
        and(
          inArray(musyawarahTable.id, id),
          eq(musyawarahTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Musyawarah", error);
    throw InternalError;
  }
}
