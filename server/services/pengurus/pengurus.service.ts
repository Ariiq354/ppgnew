import { db } from "~~/server/database";
import type { TPengurusCreate, TPengurusList } from "./dto/pengurus.dto";
import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { pengurusTable } from "~~/server/database/schema/pengurus";

export async function getAllPengurus(
  daerahId: number,
  { limit, page, search }: TPengurusList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengurusTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(pengurusTable.nama, searchCondition),
        like(pengurusTable.pendidikan, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: pengurusTable.id,
      nama: pengurusTable.nama,
      pendidikan: pengurusTable.pendidikan,
      bidang: pengurusTable.bidang,
      foto: pengurusTable.foto,
      tempatLahir: pengurusTable.tempatLahir,
      tanggalLahir: pengurusTable.tanggalLahir,
    })
    .from(pengurusTable)
    .where(and(...conditions))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Pengurus", error);
    throw InternalError;
  }
}

export async function createPengurus(daerahId: number, data: TPengurusCreate) {
  try {
    return await db
      .insert(pengurusTable)
      .values({
        ...data,
        daerahId,
      })
      .returning({ insertedId: pengurusTable.id });
  } catch (error) {
    console.error("Failed to create Pengurus", error);
    throw InternalError;
  }
}

export async function updatePengurus(
  id: number,
  daerahId: number,
  data: TPengurusCreate
) {
  try {
    return await db
      .update(pengurusTable)
      .set(data)
      .where(
        and(eq(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
      );
  } catch (error) {
    console.error("Failed to Update Pengurus", error);
    throw InternalError;
  }
}

export async function deletePengurus(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(pengurusTable)
      .where(
        and(inArray(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
      );
  } catch (error) {
    console.error("Failed to delete Pengurus", error);
    throw InternalError;
  }
}
