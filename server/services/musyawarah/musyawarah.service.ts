import { db } from "~~/server/database";
import type { TMusyawarahCreate, TMusyawarahList } from "./dto/musyawarah.dto";
import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { musyawarahTable } from "~~/server/database/schema/pengurus";

export async function getAllMusyawarah(
  daerahId: number,
  { limit, page, search }: TMusyawarahList
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
    .where(and(...conditions))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
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

export async function createMusyawarah(
  daerahId: number,
  data: TMusyawarahCreate
) {
  try {
    return await db
      .insert(musyawarahTable)
      .values({
        ...data,
        daerahId,
      })
      .returning({ insertedId: musyawarahTable.id });
  } catch (error) {
    console.error("Failed to create Musyawarah", error);
    throw InternalError;
  }
}

export async function updateMusyawarah(
  id: number,
  daerahId: number,
  data: TMusyawarahCreate
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
