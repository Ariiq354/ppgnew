import { count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import type { TDaerahCreate } from "./dto/daerah.dto";
import {
  daerahTable,
  desaTable,
  kelompokTable,
} from "~~/server/database/schema/wilayah";

export async function getAllDaerah() {
  return await db.query.daerahTable.findMany();
}

export async function getDaerahById(id: number) {
  return await db.query.daerahTable.findFirst({
    where: eq(daerahTable.id, id),
  });
}

export async function createDaerah(data: TDaerahCreate) {
  return await db
    .insert(daerahTable)
    .values(data)
    .returning({ insertedId: daerahTable.id });
}

export async function updateDaerah(id: number, data: TDaerahCreate) {
  return await db.update(daerahTable).set(data).where(eq(daerahTable.id, id));
}

export async function deleteDaerah(id: number[]) {
  return await db.delete(daerahTable).where(inArray(daerahTable.id, id));
}

export async function getCountDaerah() {
  const [data] = await db
    .select({
      count: count(),
    })
    .from(daerahTable);
  return data?.count;
}

export async function checkWilayahNameExist(name: string) {
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
}
