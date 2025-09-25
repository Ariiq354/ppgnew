import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { desaTable, kelompokTable } from "~~/server/database/schema/wilayah";
import type { TPagination } from "~~/server/utils/dto";
import type { TKelompokCreate } from "../api/v1/kelompok/_dto";

export async function getAllKelompok({ limit, page }: TPagination) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: kelompokTable.id,
      name: kelompokTable.name,
      desaId: kelompokTable.desaId,
    })
    .from(kelompokTable);

  const total = assertNoErr(
    "Failed to get total kelompok",
    await to(db.$count(query))
  );
  const data = assertNoErr(
    "Failed to get data kelompok",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getOptionsKelompok(desaId: number) {
  return assertNoErr(
    "Failed to get options kelompok",
    await to(
      db
        .select({
          id: kelompokTable.id,
          name: kelompokTable.name,
        })
        .from(kelompokTable)
        .where(eq(kelompokTable.desaId, desaId))
    )
  );
}

export async function getKelompokByDaerahId(daerahId: number) {
  return assertNoErr(
    "Failed to get kelompok by daerah id",
    await to(
      db
        .select({
          id: kelompokTable.id,
          name: kelompokTable.name,
          desaId: kelompokTable.desaId,
        })
        .from(kelompokTable)
        .leftJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
        .where(eq(desaTable.daerahId, daerahId))
    )
  );
}

export async function getKelompokByDesaId(desaId: number) {
  return assertNoErr(
    "Failed to get kelompok by desa id",
    await to(
      db
        .select({
          id: kelompokTable.id,
          name: kelompokTable.name,
          desaId: kelompokTable.desaId,
        })
        .from(kelompokTable)
        .where(eq(kelompokTable.desaId, desaId))
    )
  );
}

export async function createKelompok(data: TKelompokCreate) {
  return assertNoErr(
    "Failed to create kelompok",
    await to(
      db
        .insert(kelompokTable)
        .values(data)
        .returning({ insertedId: kelompokTable.id })
    )
  );
}

export async function updateKelompok(id: number, data: TKelompokCreate) {
  assertNoErr(
    "Failed to update kelompok",
    await to(db.update(kelompokTable).set(data).where(eq(kelompokTable.id, id)))
  );
}

export async function deleteKelompok(id: number[]) {
  assertNoErr(
    "Failed to delete kelompok",
    await to(db.delete(kelompokTable).where(inArray(kelompokTable.id, id)))
  );
}

export async function getCountKelompok(desaId: number) {
  return assertNoErr(
    "Failed get count kelompok",
    await to(db.$count(kelompokTable, eq(kelompokTable.desaId, desaId)))
  );
}
