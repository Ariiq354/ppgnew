import { count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import type { TKelompokCreate, TKelompokList } from "./dto/kelompok.dto";
import { desaTable, kelompokTable } from "~~/server/database/schema/wilayah";

export async function getAllKelompok({ limit, page, desaId }: TKelompokList) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: kelompokTable.id,
      name: kelompokTable.name,
      desaId: kelompokTable.desaId,
    })
    .from(kelompokTable)
    .where(eq(kelompokTable.desaId, desaId));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Kelompok", error);
    throw InternalError;
  }
}

export async function getOptionsKelompok(desaId: number) {
  try {
    const data = await db
      .select({
        id: kelompokTable.id,
        name: kelompokTable.name,
      })
      .from(kelompokTable)
      .where(eq(kelompokTable.desaId, desaId));

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Options Kelompok", error);
    throw InternalError;
  }
}

export async function getKelompokByDaerahId(daerahId: number) {
  try {
    return await db
      .select({
        id: kelompokTable.id,
        name: kelompokTable.name,
        desaId: kelompokTable.desaId,
      })
      .from(kelompokTable)
      .leftJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
      .where(eq(desaTable.daerahId, daerahId));
  } catch (error) {
    console.error("Failed to get List Kelompok By Daerah Id", error);
    throw InternalError;
  }
}

export async function createKelompok(data: TKelompokCreate) {
  try {
    return await db
      .insert(kelompokTable)
      .values(data)
      .returning({ insertedId: kelompokTable.id });
  } catch (error) {
    console.error("Failed to create Kelompok", error);
    throw InternalError;
  }
}

export async function updateKelompok(id: number, data: TKelompokCreate) {
  try {
    return await db
      .update(kelompokTable)
      .set(data)
      .where(eq(kelompokTable.id, id));
  } catch (error) {
    console.error("Failed to Update Kelompok", error);
    throw InternalError;
  }
}

export async function deleteKelompok(id: number[]) {
  try {
    return await db.delete(kelompokTable).where(inArray(kelompokTable.id, id));
  } catch (error) {
    console.error("Failed to delete Kelompok", error);
    throw InternalError;
  }
}

export async function getCountKelompok(daerahId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(kelompokTable)
      .leftJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
      .where(eq(desaTable.daerahId, daerahId));
    return data?.count;
  } catch (error) {
    console.error("Failed to get Count Kelompok", error);
    throw InternalError;
  }
}
