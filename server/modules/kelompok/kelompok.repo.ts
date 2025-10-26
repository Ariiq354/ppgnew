import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { desaTable, kelompokTable } from "~~/server/database/schema/wilayah";
import type { TKelompokCreate, TKelompokList } from "./kelompok.dto";

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

  const total = await tryCatch(
    "Failed to get total kelompok",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get data kelompok",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getOptionsKelompok(desaId: number) {
  return await tryCatch(
    "Failed to get options kelompok",
    db
      .select({
        id: kelompokTable.id,
        name: kelompokTable.name,
      })
      .from(kelompokTable)
      .where(eq(kelompokTable.desaId, desaId))
  );
}

export async function getKelompokByDaerahId(daerahId: number) {
  return await tryCatch(
    "Failed to get kelompok by daerah id",
    db
      .select({
        id: kelompokTable.id,
        name: kelompokTable.name,
        desaId: kelompokTable.desaId,
      })
      .from(kelompokTable)
      .leftJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
      .where(eq(desaTable.daerahId, daerahId))
  );
}

export async function getKelompokByDesaId(desaId: number) {
  return await tryCatch(
    "Failed to get kelompok by desa id",
    db
      .select({
        id: kelompokTable.id,
        name: kelompokTable.name,
        desaId: kelompokTable.desaId,
      })
      .from(kelompokTable)
      .where(eq(kelompokTable.desaId, desaId))
  );
}

export async function createKelompok(data: TKelompokCreate) {
  return await tryCatch(
    "Failed to create kelompok",
    db
      .insert(kelompokTable)
      .values(data)
      .returning({ insertedId: kelompokTable.id })
  );
}

export async function updateKelompok(id: number, data: TKelompokCreate) {
  await tryCatch(
    "Failed to update kelompok",
    db.update(kelompokTable).set(data).where(eq(kelompokTable.id, id))
  );
}

export async function deleteKelompok(id: number[]) {
  await tryCatch(
    "Failed to delete kelompok",
    db.delete(kelompokTable).where(inArray(kelompokTable.id, id))
  );
}

export async function getCountKelompok(desaId: number) {
  return await tryCatch(
    "Failed get count kelompok",
    db.$count(kelompokTable, eq(kelompokTable.desaId, desaId))
  );
}
