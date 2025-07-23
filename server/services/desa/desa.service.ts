import { count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { desaTable } from "~~/server/database/schema/wilayah";
import { getTotalQuery } from "~~/server/utils/query";
import type { TDesaCreate, TDesaList } from "./dto/desa.dto";

export async function getAllDesa({ limit, page, daerahId }: TDesaList) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: desaTable.id,
      name: desaTable.name,
      daerahId: desaTable.daerahId,
    })
    .from(desaTable)
    .where(eq(desaTable.daerahId, daerahId))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Desa", error);
    throw InternalError;
  }
}

export async function getDesaById(id: number) {
  return await db.query.desaTable.findFirst({ where: eq(desaTable.id, id) });
}

export async function createDesa(data: TDesaCreate) {
  try {
    return await db
      .insert(desaTable)
      .values(data)
      .returning({ insertedId: desaTable.id });
  } catch (error) {
    console.error("Failed to create Desa", error);
    throw InternalError;
  }
}

export async function updateDesa(id: number, data: TDesaCreate) {
  try {
    return await db.update(desaTable).set(data).where(eq(desaTable.id, id));
  } catch (error) {
    console.error("Failed to Update Desa", error);
    throw InternalError;
  }
}

export async function deleteDesa(id: number[]) {
  try {
    return await db.delete(desaTable).where(inArray(desaTable.id, id));
  } catch (error) {
    console.error("Failed to delete Desa", error);
    throw InternalError;
  }
}

export async function getCountDesa() {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(desaTable);
    return data?.count;
  } catch (error) {
    console.error("Failed to get Count Desa", error);
    throw InternalError;
  }
}
