import {
  and,
  count,
  eq,
  inArray,
  like,
  or,
  Param,
  type SQL,
  sql,
} from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import type { TAbsensiTahfidzCreate } from "./absensi-tahfidz.dto";
import {
  absensiGenerusTahfidzTable,
  kelasTahfidzTable,
} from "~~/server/database/schema/tahfidz";
import type { TSearchPagination } from "~~/server/utils/dto";

export async function getAllTahfidzExclude(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
    })
    .from(generusTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Tahfidz Absensi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Tahfidz Absensi",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAbsensiTahfidzByKelasId(
  daerahId: number,
  kelasId: number
) {
  const data = await tryCatch(
    "Failed to get Absensi Tahfidz",
    db
      .select({
        id: absensiGenerusTahfidzTable.id,
        generusId: absensiGenerusTahfidzTable.generusId,
        detail: absensiGenerusTahfidzTable.detail,
        keterangan: absensiGenerusTahfidzTable.keterangan,
      })
      .from(absensiGenerusTahfidzTable)
      .leftJoin(
        kelasTahfidzTable,
        eq(absensiGenerusTahfidzTable.kelasId, kelasTahfidzTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTahfidzTable.generusId)
      )
      .where(
        and(
          eq(absensiGenerusTahfidzTable.kelasId, kelasId),
          eq(kelasTahfidzTable.daerahId, daerahId),
          sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`
        )
      )
  );

  return {
    data,
  };
}

export async function getCountAbsensiTahfidz(daerahId: number) {
  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        count: count(),
      })
      .from(absensiGenerusTahfidzTable)
      .leftJoin(
        kelasTahfidzTable,
        eq(absensiGenerusTahfidzTable.kelasId, kelasTahfidzTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTahfidzTable.generusId)
      )
      .where(
        and(
          eq(kelasTahfidzTable.daerahId, daerahId),
          sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`
        )
      )
  );

  return data!.count;
}

export async function getCountTahfidz(daerahId: number) {
  return await tryCatch(
    "Failed to get Count Tahfidz",
    db.$count(
      generusTable,
      and(
        eq(generusTable.daerahId, daerahId),
        sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`
      )
    )
  );
}

export async function getAllTahfidzSummary(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTahfidzTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTahfidzTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusTahfidzTable,
      eq(generusTable.id, absensiGenerusTahfidzTable.generusId)
    )
    .groupBy(generusTable.id, generusTable.nama);

  const total = await tryCatch(
    "Failed to get total count of Tahfidz Summary",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Tahfidz Summary",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getCountTahfidzAbsensi(daerahId: number) {
  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(
      generusTable,
      and(
        eq(generusTable.daerahId, daerahId),
        sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`
      )
    )
  );
}

export async function createAbsensiTahfidz(
  kelasId: number,
  daerahId: number,
  data: TAbsensiTahfidzCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi creation",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

  if (generus?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Tidak ada generus di daerah ini",
    });
  }

  return await tryCatch(
    "Failed to create Absensi Generus Tahfidz",
    db.insert(absensiGenerusTahfidzTable).values({
      ...data,
      kelasId,
    })
  );
}

export async function updateAbsensiTahfidz(
  id: number,
  kelasId: number,
  daerahId: number,
  data: TAbsensiTahfidzCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi update",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

  if (generus?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Tidak ada generus di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to Update Absensi Tahfidz",
    db
      .update(absensiGenerusTahfidzTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusTahfidzTable.id, id),
          eq(absensiGenerusTahfidzTable.kelasId, kelasId)
        )
      )
  );
}
export async function deleteAbsensiTahfidz(id: number[], kelasId: number) {
  return await tryCatch(
    "Failed to delete Absensi Tahfidz",
    db
      .delete(absensiGenerusTahfidzTable)
      .where(
        and(
          inArray(absensiGenerusTahfidzTable.id, id),
          eq(absensiGenerusTahfidzTable.kelasId, kelasId)
        )
      )
  );
}
