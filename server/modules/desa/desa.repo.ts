import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { desaTable } from "~~/server/database/schema/wilayah";
import type { TDesaCreate, TDesaList } from "./desa.dto";

export async function getAllDesa({ limit, page, daerahId }: TDesaList) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: desaTable.id,
      name: desaTable.name,
      daerahId: desaTable.daerahId,
    })
    .from(desaTable)
    .where(eq(desaTable.daerahId, daerahId));

  const total = await tryCatch("Failed to get total desa", db.$count(query));
  const data = await tryCatch(
    "Failed to get data desa",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getOptionsDesa(daerahId: number) {
  return await tryCatch(
    "Failed to get options desa",
    db
      .select({
        id: desaTable.id,
        name: desaTable.name,
      })
      .from(desaTable)
      .where(eq(desaTable.daerahId, daerahId))
  );
}

export async function getDesaById(id: number) {
  return await tryCatch(
    "Failed to get desa by id",
    db.query.desaTable.findFirst({ where: eq(desaTable.id, id) })
  );
}

export async function getDesaByDaerahId(daerahId: number) {
  return await tryCatch(
    "Failed to get desa by daerah id",
    db
      .select({
        id: desaTable.id,
        name: desaTable.name,
        daerahId: desaTable.daerahId,
      })
      .from(desaTable)
      .where(eq(desaTable.daerahId, daerahId))
  );
}

export async function createDesa(data: TDesaCreate) {
  return await tryCatch(
    "Failed to create desa",
    db.insert(desaTable).values(data).returning({ insertedId: desaTable.id })
  );
}

export async function updateDesa(id: number, data: TDesaCreate) {
  await tryCatch(
    "Failed to update desa",
    db.update(desaTable).set(data).where(eq(desaTable.id, id))
  );
}

export async function deleteDesa(id: number[]) {
  await tryCatch(
    "Failed to delete desa",
    db.delete(desaTable).where(inArray(desaTable.id, id))
  );
}

export async function getCountDesa(daerahId: number) {
  return await tryCatch(
    "Failed get count desa",
    db.$count(desaTable, eq(desaTable.daerahId, daerahId))
  );
}
