import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  daerahTable,
  desaTable,
  kelompokTable,
} from "~~/server/database/schema/wilayah";
import type { TPagination } from "~~/server/utils/dto/common.dto";
import type { TDaerahCreate } from "./daerah.dto";

export async function getAllDaerah({ limit, page }: TPagination) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: daerahTable.id,
      name: daerahTable.name,
    })
    .from(daerahTable)
    .orderBy(desc(daerahTable.id));

  const total = await tryCatch("Failed to get total daerah", db.$count(query));

  const data = await tryCatch(
    "Failed to get data daerah",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getOptionsDaerah() {
  return await tryCatch(
    "Failed to get options daerah",
    db
      .select({
        id: daerahTable.id,
        name: daerahTable.name,
      })
      .from(daerahTable)
  );
}

export async function createDaerah(data: TDaerahCreate) {
  return await tryCatch(
    "Failed to create daerah",
    db
      .insert(daerahTable)
      .values(data)
      .returning({ insertedId: daerahTable.id })
  );
}

export async function updateDaerah(id: number, data: TDaerahCreate) {
  await tryCatch(
    "Failed to update daerah",
    db.update(daerahTable).set(data).where(eq(daerahTable.id, id))
  );
}

export async function deleteDaerah(id: number[]) {
  await tryCatch(
    "Failed to delete daerah",
    db.delete(daerahTable).where(inArray(daerahTable.id, id))
  );
}

export async function checkWilayahNameExist(name: string) {
  const daerah = await tryCatch(
    "Failed to check daerah name",
    db
      .select({ name: daerahTable.name })
      .from(daerahTable)
      .where(eq(daerahTable.name, name))
  );
  const desa = await tryCatch(
    "Failed to check desa name",
    db
      .select({ name: desaTable.name })
      .from(desaTable)
      .where(eq(desaTable.name, name))
  );
  const kelompok = await tryCatch(
    "Failed to check kelompok name",
    db
      .select({ name: kelompokTable.name })
      .from(kelompokTable)
      .where(eq(kelompokTable.name, name))
  );
  return [...daerah, ...desa, ...kelompok].length > 0;
}

export async function checkSingkatanExist(singkatan: string) {
  const daerah = await tryCatch(
    "Failed to check daerah name",
    db
      .select({ name: daerahTable.name })
      .from(daerahTable)
      .where(eq(daerahTable.singkatan, singkatan))
  );
  return daerah.length > 0;
}
