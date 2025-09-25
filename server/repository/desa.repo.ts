import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { desaTable } from "~~/server/database/schema/wilayah";
import type { TPagination } from "~~/server/utils/dto";
import type { TDesaCreate } from "../api/v1/desa/_dto";

export async function getAllDesa({ limit, page }: TPagination) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: desaTable.id,
      name: desaTable.name,
      daerahId: desaTable.daerahId,
    })
    .from(desaTable);

  const total = assertNoErr(
    "Failed to get total desa",
    await to(db.$count(query))
  );
  const data = assertNoErr(
    "Failed to get data desa",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getOptionsDesa(daerahId: number) {
  return assertNoErr(
    "Failed to get options desa",
    await to(
      db
        .select({
          id: desaTable.id,
          name: desaTable.name,
        })
        .from(desaTable)
        .where(eq(desaTable.daerahId, daerahId))
    )
  );
}

export async function getDesaById(id: number) {
  return assertNoErr(
    "Failed to get desa by id",
    await to(db.query.desaTable.findFirst({ where: eq(desaTable.id, id) }))
  );
}

export async function getDesaByDaerahId(daerahId: number) {
  return assertNoErr(
    "Failed to get desa by daerah id",
    await to(
      db
        .select({
          id: desaTable.id,
          name: desaTable.name,
          daerahId: desaTable.daerahId,
        })
        .from(desaTable)
        .where(eq(desaTable.daerahId, daerahId))
    )
  );
}

export async function createDesa(data: TDesaCreate) {
  return assertNoErr(
    "Failed to create desa",
    await to(
      db.insert(desaTable).values(data).returning({ insertedId: desaTable.id })
    )
  );
}

export async function updateDesa(id: number, data: TDesaCreate) {
  assertNoErr(
    "Failed to update desa",
    await to(db.update(desaTable).set(data).where(eq(desaTable.id, id)))
  );
}

export async function deleteDesa(id: number[]) {
  assertNoErr(
    "Failed to delete desa",
    await to(db.delete(desaTable).where(inArray(desaTable.id, id)))
  );
}

export async function getCountDesa(daerahId: number) {
  return assertNoErr(
    "Failed get count desa",
    await to(db.$count(desaTable, eq(desaTable.daerahId, daerahId)))
  );
}
