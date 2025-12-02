import {
  and,
  count,
  desc,
  eq,
  ilike,
  inArray,
  or,
  type SQL,
  sql,
} from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiGenerusGpsTable,
  kelasGpsTable,
} from "~~/server/database/schema/desa";
import { generusTable } from "~~/server/database/schema/generus";
import { getGenerusByStatusSQL } from "~~/server/utils/common";
import { exclude } from "~~/shared/enum";

export async function getAbsensiGpsByKelasId(desaId: number, kelasId: number) {
  const data = await tryCatch(
    "Failed to get Absensi Gps",
    db
      .select({
        id: absensiGenerusGpsTable.id,
        generusId: absensiGenerusGpsTable.generusId,
        detail: absensiGenerusGpsTable.detail,
        keterangan: absensiGenerusGpsTable.keterangan,
      })
      .from(absensiGenerusGpsTable)
      .leftJoin(
        kelasGpsTable,
        eq(absensiGenerusGpsTable.kelasId, kelasGpsTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusGpsTable.generusId)
      )
      .where(
        and(
          eq(absensiGenerusGpsTable.kelasId, kelasId),
          eq(kelasGpsTable.desaId, desaId),
          ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] })
        )
      )
  );

  return data;
}

export async function getCountAbsensiGps(desaId: number) {
  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        count: count(),
      })
      .from(absensiGenerusGpsTable)
      .leftJoin(
        kelasGpsTable,
        eq(absensiGenerusGpsTable.kelasId, kelasGpsTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusGpsTable.generusId)
      )
      .where(
        and(
          eq(kelasGpsTable.desaId, desaId),
          ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] })
        )
      )
  );

  return data!.count;
}

export async function getAllGpsSummary(
  desaId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.desaId, desaId),
    ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] }),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(ilike(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusGpsTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusGpsTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusGpsTable,
      eq(generusTable.id, absensiGenerusGpsTable.generusId)
    )
    .groupBy(generusTable.id, generusTable.nama)
    .orderBy(desc(generusTable.id));

  const total = await tryCatch(
    "Failed to get total count of Gps Summary",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Gps Summary",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function createAbsensiGps(
  kelasId: number,
  desaId: number,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi creation",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

  if (generus?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Tidak ada generus di daerah ini",
    });
  }

  return await tryCatch(
    "Failed to create Absensi Generus Gps",
    db.insert(absensiGenerusGpsTable).values({
      ...data,
      kelasId,
    })
  );
}

export async function updateAbsensiGps(
  id: number,
  kelasId: number,
  desaId: number,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi update",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

  if (generus?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Tidak ada generus di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to Update Absensi Gps",
    db
      .update(absensiGenerusGpsTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusGpsTable.id, id),
          eq(absensiGenerusGpsTable.kelasId, kelasId)
        )
      )
  );
}
export async function deleteAbsensiGps(id: number[], kelasId: number) {
  return await tryCatch(
    "Failed to delete Absensi Gps",
    db
      .delete(absensiGenerusGpsTable)
      .where(
        and(
          inArray(absensiGenerusGpsTable.id, id),
          eq(absensiGenerusGpsTable.kelasId, kelasId)
        )
      )
  );
}
