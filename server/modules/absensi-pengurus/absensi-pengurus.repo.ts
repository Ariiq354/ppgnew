import {
  and,
  count,
  desc,
  eq,
  ilike,
  inArray,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiPengurusTable,
  musyawarahTable,
  pengurusTable,
} from "~~/server/database/schema/pengurus";
import type { TAbsensiPengurusCreate } from "./absensi-pengurus.dto";

export async function getAbsensiPengurusByMusyawarahId(
  daerahId: number,
  musyawarahId: number
) {
  const data = await tryCatch(
    "Failed to get Absensi Pengurus",
    db
      .select({
        id: absensiPengurusTable.id,
        pengurusId: absensiPengurusTable.pengurusId,
        detail: absensiPengurusTable.detail,
        keterangan: absensiPengurusTable.keterangan,
      })
      .from(absensiPengurusTable)
      .leftJoin(
        musyawarahTable,
        eq(absensiPengurusTable.musyawarahId, musyawarahTable.id)
      )
      .where(
        and(
          eq(absensiPengurusTable.musyawarahId, musyawarahId),
          eq(musyawarahTable.daerahId, daerahId)
        )
      )
  );

  return data;
}

export async function getAllPengurusAbsensi(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengurusTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        ilike(pengurusTable.nama, searchCondition),
        ilike(pengurusTable.pendidikan, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: pengurusTable.id,
      nama: pengurusTable.nama,
      bidang: pengurusTable.bidang,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiPengurusTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiPengurusTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(pengurusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiPengurusTable,
      eq(pengurusTable.id, absensiPengurusTable.pengurusId)
    )
    .groupBy(pengurusTable.id, pengurusTable.nama, pengurusTable.bidang)
    .orderBy(desc(pengurusTable.id));

  const total = await tryCatch(
    "Failed to get total Pengurus",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get data Pengurus",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getCountAbsensiPengurus(daerahId: number) {
  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        count: count(),
      })
      .from(absensiPengurusTable)
      .leftJoin(
        musyawarahTable,
        eq(absensiPengurusTable.musyawarahId, musyawarahTable.id)
      )
      .where(eq(musyawarahTable.daerahId, daerahId))
  );

  return data!.count;
}

export async function createAbsensiPengurus(
  musyawarahId: number,
  data: TAbsensiPengurusCreate
) {
  return await tryCatch(
    "Failed to create Absensi Pengurus",
    db.insert(absensiPengurusTable).values({
      ...data,
      musyawarahId,
    })
  );
}

export async function updateAbsensiPengurus(
  id: number,
  musyawarahId: number,
  data: TAbsensiPengurusCreate
) {
  return await tryCatch(
    "Failed to Update Absensi Pengurus",
    db
      .update(absensiPengurusTable)
      .set(data)
      .where(
        and(
          eq(absensiPengurusTable.id, id),
          eq(absensiPengurusTable.musyawarahId, musyawarahId)
        )
      )
  );
}

export async function deleteAbsensiPengurus(
  id: number[],
  musyawarahId: number
) {
  return await tryCatch(
    "Failed to delete Absensi Pengurus",
    db
      .delete(absensiPengurusTable)
      .where(
        and(
          inArray(absensiPengurusTable.id, id),
          eq(absensiPengurusTable.musyawarahId, musyawarahId)
        )
      )
  );
}
