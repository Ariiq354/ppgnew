import { count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import type { TKelompokCreate } from "./dto/kelompok.dto";
import { kelompokTable } from "~~/server/database/schema/wilayah";

export async function getAllKelompok() {
  return await db.query.kelompokTable.findMany();
}

export async function getKelompokById(id: number) {
  return await db.query.kelompokTable.findFirst({
    where: eq(kelompokTable.id, id),
  });
}

export async function createKelompok(data: TKelompokCreate) {
  return await db
    .insert(kelompokTable)
    .values(data)
    .returning({ insertedId: kelompokTable.id });
}

export async function updateKelompok(id: number, data: TKelompokCreate) {
  return await db
    .update(kelompokTable)
    .set(data)
    .where(eq(kelompokTable.id, id));
}

export async function deleteKelompok(id: number[]) {
  return await db.delete(kelompokTable).where(inArray(kelompokTable.id, id));
}

export async function getCountKelompok() {
  const [data] = await db
    .select({
      count: count(),
    })
    .from(kelompokTable);
  return data?.count;
}
