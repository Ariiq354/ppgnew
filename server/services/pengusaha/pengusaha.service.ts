import { db } from "~~/server/database";
import type { TPengusahaCreate, TPengusahaList } from "./dto/pengusaha.dto";
import { and, count, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { pengusahaTable } from "~~/server/database/schema/kemandirian";

export async function getAllPengusaha(
  daerahId: number,
  { limit, page, search }: TPengusahaList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengusahaTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(pengusahaTable.nama, searchCondition)));
    conditions.push(or(like(pengusahaTable.bidangPekerjaan, searchCondition)));
    conditions.push(or(like(pengusahaTable.namaUsaha, searchCondition)));
    conditions.push(or(like(pengusahaTable.noTelepon, searchCondition)));
  }

  const query = db
    .select({
      id: pengusahaTable.id,
      nama: pengusahaTable.nama,
      bidangPekerjaan: pengusahaTable.bidangPekerjaan,
      namaUsaha: pengusahaTable.namaUsaha,
      noTelepon: pengusahaTable.noTelepon,
    })
    .from(pengusahaTable)
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
    console.error("Failed to get List Pengusaha", error);
    throw InternalError;
  }
}

export async function getAllPengusahaExport(daerahId: number) {
  return await db
    .select({
      nama: pengusahaTable.nama,
      bidangPekerjaan: pengusahaTable.bidangPekerjaan,
      namaUsaha: pengusahaTable.namaUsaha,
      noTelepon: pengusahaTable.noTelepon,
    })
    .from(pengusahaTable)
    .where(eq(pengusahaTable.daerahId, daerahId));
}

export async function getCountPengusaha(daerahId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(pengusahaTable)
      .where(eq(pengusahaTable.daerahId, daerahId));

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Pengusaha", error);
    throw InternalError;
  }
}

export async function createPengusaha(
  daerahId: number,
  data: TPengusahaCreate
) {
  try {
    return await db.insert(pengusahaTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Pengusaha", error);
    throw InternalError;
  }
}

export async function updatePengusaha(
  id: number,
  daerahId: number,
  data: TPengusahaCreate
) {
  try {
    return await db
      .update(pengusahaTable)
      .set(data)
      .where(
        and(eq(pengusahaTable.id, id), eq(pengusahaTable.daerahId, daerahId))
      );
  } catch (error) {
    console.error("Failed to Update Pengusaha", error);
    throw InternalError;
  }
}

export async function deletePengusaha(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(pengusahaTable)
      .where(
        and(
          inArray(pengusahaTable.id, id),
          eq(pengusahaTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Pengusaha", error);
    throw InternalError;
  }
}
