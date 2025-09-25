import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  daerahTable,
  desaTable,
  kelompokTable,
} from "~~/server/database/schema/wilayah";
import type { TPagination } from "~~/server/utils/dto";
import type { TDaerahCreate } from "../api/v1/daerah/_dto";

export async function getAllDaerah({ limit, page }: TPagination) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: daerahTable.id,
      name: daerahTable.name,
    })
    .from(daerahTable);

  const total = assertNoErr(
    "Failed to get total daerah",
    await to(db.$count(query))
  );

  const data = assertNoErr(
    "Failed to get data daerah",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getOptionsDaerah() {
  return assertNoErr(
    "Failed to get options daerah",
    await to(
      db
        .select({
          id: daerahTable.id,
          name: daerahTable.name,
        })
        .from(daerahTable)
    )
  );
}

export async function createDaerah(data: TDaerahCreate) {
  return assertNoErr(
    "Failed to create daerah",
    await to(
      db
        .insert(daerahTable)
        .values(data)
        .returning({ insertedId: daerahTable.id })
    )
  );
}

export async function updateDaerah(id: number, data: TDaerahCreate) {
  assertNoErr(
    "Failed to update daerah",
    await to(db.update(daerahTable).set(data).where(eq(daerahTable.id, id)))
  );
}

export async function deleteDaerah(id: number[]) {
  assertNoErr(
    "Failed to delete daerah",
    await to(db.delete(daerahTable).where(inArray(daerahTable.id, id)))
  );
}

export async function checkWilayahNameExist(name: string) {
  const daerah = assertNoErr(
    "Failed to check daerah name",
    await to(
      db
        .select({ name: daerahTable.name })
        .from(daerahTable)
        .where(eq(daerahTable.name, name))
    )
  );

  const desa = assertNoErr(
    "Failed to check desa name",
    await to(
      db
        .select({ name: desaTable.name })
        .from(desaTable)
        .where(eq(desaTable.name, name))
    )
  );

  const kelompok = assertNoErr(
    "Failed to check kelompok name",
    await to(
      db
        .select({ name: kelompokTable.name })
        .from(kelompokTable)
        .where(eq(kelompokTable.name, name))
    )
  );

  return [...daerah, ...desa, ...kelompok].length > 0;
}
