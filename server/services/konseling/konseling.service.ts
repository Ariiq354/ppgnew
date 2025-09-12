import { db } from "~~/server/database";
import type { TKonselingCreate, TKonselingList } from "./dto/konseling.dto";
import { and, count, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { generusKonselingTable } from "~~/server/database/schema/kelompok";
import { generusTable } from "~~/server/database/schema/generus";

export async function getAllKonseling(
  daerahId: number,
  { limit, page, search }: TKonselingList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusKonselingTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusKonselingTable.id,
      nama: generusKonselingTable.nama,
      bidangPekerjaan: generusKonselingTable.bidangPekerjaan,
      namaUsaha: generusKonselingTable.namaUsaha,
      noTelepon: generusKonselingTable.noTelepon,
    })
    .from(generusKonselingTable)
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
    console.error("Failed to get List Konseling", error);
    throw InternalError;
  }
}

export async function getAllKonselingExport(daerahId: number) {
  return await db
    .select({
      nama: generusKonselingTable.nama,
      bidangPekerjaan: generusKonselingTable.bidangPekerjaan,
      namaUsaha: generusKonselingTable.namaUsaha,
      noTelepon: generusKonselingTable.noTelepon,
    })
    .from(generusKonselingTable)
    .where(eq(generusKonselingTable.daerahId, daerahId));
}

export async function getCountKonseling(daerahId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(generusKonselingTable)
      .where(eq(generusKonselingTable.daerahId, daerahId));

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Konseling", error);
    throw InternalError;
  }
}

export async function createKonseling(
  daerahId: number,
  data: TKonselingCreate
) {
  try {
    return await db.insert(generusKonselingTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Konseling", error);
    throw InternalError;
  }
}

export async function updateKonseling(
  id: number,
  daerahId: number,
  data: TKonselingCreate
) {
  try {
    return await db
      .update(generusKonselingTable)
      .set(data)
      .where(
        and(
          eq(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Konseling", error);
    throw InternalError;
  }
}

export async function deleteKonseling(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(generusKonselingTable)
      .where(
        and(
          inArray(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Konseling", error);
    throw InternalError;
  }
}
