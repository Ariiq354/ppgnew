import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { musyawarahBidangTable } from "~~/server/database/schema/bidang";
import type { roles } from "~~/shared/permission";
import type {
  TMusyawarahBidangCreate,
  TMusyawarahBidangList,
} from "./musyawarah-bidang.dto";

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
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of MusyawarahBidang",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of MusyawarahBidang",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllMusyawarahBidangExport(
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  return await tryCatch(
    "Failed to export MusyawarahBidang data",
    db
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

  const data = await tryCatch(
    "Failed to get all MusyawarahBidang options",
    db
      .select({
        id: musyawarahBidangTable.id,
        nama: musyawarahBidangTable.nama,
        tanggal: musyawarahBidangTable.tanggal,
      })
      .from(musyawarahBidangTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function createMusyawarahBidang(
  daerahId: number,
  data: TMusyawarahBidangCreate
) {
  return await tryCatch(
    "Failed to create MusyawarahBidang",
    db.insert(musyawarahBidangTable).values({
      ...data,
      daerahId,
    })
  );
}

export async function updateMusyawarahBidang(
  id: number,
  daerahId: number,
  data: TMusyawarahBidangCreate
) {
  return await tryCatch(
    "Failed to Update MusyawarahBidang",
    db
      .update(musyawarahBidangTable)
      .set(data)
      .where(
        and(
          eq(musyawarahBidangTable.id, id),
          eq(musyawarahBidangTable.daerahId, daerahId)
        )
      )
  );
}

export async function deleteMusyawarahBidang(
  daerahId: number,
  bidang: (typeof roles)[number],
  id: number[]
) {
  return await tryCatch(
    "Failed to delete MusyawarahBidang",
    db
      .delete(musyawarahBidangTable)
      .where(
        and(
          inArray(musyawarahBidangTable.id, id),
          eq(musyawarahBidangTable.daerahId, daerahId),
          eq(musyawarahBidangTable.bidang, bidang)
        )
      )
  );
}
