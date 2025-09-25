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

  const [total, err1] = await to(db.$count(query));
  if (err1) {
    console.error("Failed to get total daerah", err1);
    throw InternalError;
  }

  const [data, err2] = await to(query.limit(limit).offset(offset));
  if (err2) {
    console.error("Failed to get data daerah", err2);
    throw InternalError;
  }

  return {
    data,
    total,
  };
}

export async function getOptionsDaerah() {
  const [_, err] = await to(
    db
      .select({
        id: daerahTable.id,
        name: daerahTable.name,
      })
      .from(daerahTable)
  );
  if (err) {
    console.error("Failed to get options daerah", err);
    throw InternalError;
  }
}

export async function createDaerah(data: TDaerahCreate) {
  const [res, err] = await to(
    db
      .insert(daerahTable)
      .values(data)
      .returning({ insertedId: daerahTable.id })
  );
  if (err) {
    console.error("Failed to create daerah", err);
    throw InternalError;
  }

  return res;
}

export async function updateDaerah(id: number, data: TDaerahCreate) {
  const [_, err] = await to(
    db.update(daerahTable).set(data).where(eq(daerahTable.id, id))
  );
  if (err) {
    console.error("Failed to update daerah", err);
    throw InternalError;
  }
}

export async function deleteDaerah(id: number[]) {
  const [_, err] = await to(
    db.delete(daerahTable).where(inArray(daerahTable.id, id))
  );
  if (err) {
    console.error("Failed to delete daerah", err);
    throw InternalError;
  }
}

export async function checkWilayahNameExist(name: string) {
  const [daerah, err1] = await to(
    db
      .select({ name: daerahTable.name })
      .from(daerahTable)
      .where(eq(daerahTable.name, name))
  );
  if (err1) {
    console.error("Failed to check daerah Name", err1);
    throw InternalError;
  }

  const [desa, err2] = await to(
    db
      .select({ name: desaTable.name })
      .from(desaTable)
      .where(eq(desaTable.name, name))
  );
  if (err2) {
    console.error("Failed to check desa Name", err2);
    throw InternalError;
  }

  const [kelompok, err3] = await to(
    db
      .select({ name: kelompokTable.name })
      .from(kelompokTable)
      .where(eq(kelompokTable.name, name))
  );
  if (err3) {
    console.error("Failed to check desa Name", err3);
    throw InternalError;
  }

  const itemArr = [...daerah, ...desa, ...kelompok];

  if (itemArr.length > 0) {
    return true;
  }

  return false;
}
