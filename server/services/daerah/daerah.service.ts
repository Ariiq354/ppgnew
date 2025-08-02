import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  daerahTable,
  desaTable,
  kelompokTable,
} from "~~/server/database/schema/wilayah";
import type { TPagination } from "~~/server/utils/dto";
import { getTotalQuery } from "~~/server/utils/query";
import type { TDaerahCreate } from "./dto/daerah.dto";

export async function getAllDaerah({ limit, page }: TPagination) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: daerahTable.id,
      name: daerahTable.name,
    })
    .from(daerahTable)
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Daerah", error);
    throw InternalError;
  }
}

export async function getOptionsDaerah() {
  try {
    const data = await db
      .select({
        id: daerahTable.id,
        name: daerahTable.name,
      })
      .from(daerahTable);

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Options Daerah", error);
    throw InternalError;
  }
}

export async function createDaerah(data: TDaerahCreate) {
  try {
    return await db
      .insert(daerahTable)
      .values(data)
      .returning({ insertedId: daerahTable.id });
  } catch (error) {
    console.error("Failed to create Daerah", error);
    throw InternalError;
  }
}

export async function updateDaerah(id: number, data: TDaerahCreate) {
  try {
    return await db.update(daerahTable).set(data).where(eq(daerahTable.id, id));
  } catch (error) {
    console.error("Failed to Update Daerah", error);
    throw InternalError;
  }
}

export async function deleteDaerah(id: number[]) {
  try {
    return await db.delete(daerahTable).where(inArray(daerahTable.id, id));
  } catch (error) {
    console.error("Failed to delete Daerah", error);
    throw InternalError;
  }
}

export async function checkWilayahNameExist(name: string) {
  try {
    const daerahQuery = await db
      .select({ name: daerahTable.name })
      .from(daerahTable)
      .where(eq(daerahTable.name, name));
    const desaQuery = await db
      .select({ name: desaTable.name })
      .from(desaTable)
      .where(eq(desaTable.name, name));
    const kelompokQuery = await db
      .select({ name: kelompokTable.name })
      .from(kelompokTable)
      .where(eq(kelompokTable.name, name));

    const itemArr = [...daerahQuery, ...desaQuery, ...kelompokQuery];

    if (itemArr.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to check Wilayah Name", error);
    throw InternalError;
  }
}
