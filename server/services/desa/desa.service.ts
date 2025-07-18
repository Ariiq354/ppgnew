import { count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import type { TDesaCreate } from "./dto/desa.dto";
import { desaTable } from "~~/server/database/schema/wilayah";

export async function getAllDesa() {
  return await db.query.desaTable.findMany();
}

export async function getDesaById(id: number) {
  return await db.query.desaTable.findFirst({
    where: eq(desaTable.id, id),
  });
}

export async function createDesa(data: TDesaCreate) {
  return await db
    .insert(desaTable)
    .values(data)
    .returning({ insertedId: desaTable.id });
}

export async function updateDesa(id: number, data: TDesaCreate) {
  return await db.update(desaTable).set(data).where(eq(desaTable.id, id));
}

export async function deleteDesa(id: number[]) {
  return await db.delete(desaTable).where(inArray(desaTable.id, id));
}

export async function getCountDesa() {
  const [data] = await db
    .select({
      count: count(),
    })
    .from(desaTable);
  return data?.count;
}
