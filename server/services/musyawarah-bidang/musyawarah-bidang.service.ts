import { db } from "~~/server/database";
import type {
  TMusyawarahBidangCreate,
  TMusyawarahBidangList,
} from "./dto/musyawarah-bidang.dto";
import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { musyawarahBidangTable } from "~~/server/database/schema/bidang";
import type { roles } from "~~/shared/permission";

export async function getAllMusyawarahBidang(
  daerahId: number,
  { limit, page, search, bidang }: TMusyawarahBidangList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahBidangTable.daerahId, daerahId),
    eq(musyawarahBidangTable.bidang, bidang),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(musyawarahBidangTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: musyawarahBidangTable.id,
      nama: musyawarahBidangTable.nama,
      tanggal: musyawarahBidangTable.tanggal,
      bidang: musyawarahBidangTable.bidang,
    })
    .from(musyawarahBidangTable)
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
    console.error("Failed to get List MusyawarahBidang", error);
    throw InternalError;
  }
}

export async function getAllMusyawarahBidangExport(
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  return await db
    .select({
      nama: musyawarahBidangTable.nama,
      tanggal: musyawarahBidangTable.tanggal,
    })
    .from(musyawarahBidangTable)
    .where(
      and(
        eq(musyawarahBidangTable.daerahId, daerahId),
        eq(musyawarahBidangTable.bidang, bidang)
      )
    );
}

export async function getAllMusyawarahBidangOptions(
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahBidangTable.daerahId, daerahId),
    eq(musyawarahBidangTable.bidang, bidang),
  ];

  const data = await db
    .select({
      id: musyawarahBidangTable.id,
      nama: musyawarahBidangTable.nama,
      tanggal: musyawarahBidangTable.tanggal,
    })
    .from(musyawarahBidangTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All MusyawarahBidang", error);
    throw InternalError;
  }
}

export async function createMusyawarahBidang(
  daerahId: number,
  data: TMusyawarahBidangCreate
) {
  try {
    return await db.insert(musyawarahBidangTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create MusyawarahBidang", error);
    throw InternalError;
  }
}

export async function updateMusyawarahBidang(
  id: number,
  daerahId: number,
  data: TMusyawarahBidangCreate
) {
  try {
    return await db
      .update(musyawarahBidangTable)
      .set(data)
      .where(
        and(
          eq(musyawarahBidangTable.id, id),
          eq(musyawarahBidangTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update MusyawarahBidang", error);
    throw InternalError;
  }
}

export async function deleteMusyawarahBidang(
  daerahId: number,
  bidang: (typeof roles)[number],
  id: number[]
) {
  try {
    return await db
      .delete(musyawarahBidangTable)
      .where(
        and(
          inArray(musyawarahBidangTable.id, id),
          eq(musyawarahBidangTable.daerahId, daerahId),
          eq(musyawarahBidangTable.bidang, bidang)
        )
      );
  } catch (error) {
    console.error("Failed to delete MusyawarahBidang", error);
    throw InternalError;
  }
}
