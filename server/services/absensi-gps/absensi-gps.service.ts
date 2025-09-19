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
import type { TAbsensiGpsCreate } from "./dto/absensi-gps.dto";
import {
  absensiGenerusGpsTable,
  kelasGpsTable,
} from "~~/server/database/schema/desa";
import type { TSearchPagination } from "~~/server/utils/dto";

export async function getAllGpsExclude(
  desaId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.desaId, desaId),
    sql`(${generusTable.status} ?| ${new Param(["GPS"])})`,
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

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Gps Absensi", error);
    throw InternalError;
  }
}

export async function getAbsensiGpsByKelasId(desaId: number, kelasId: number) {
  try {
    const data = await db
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
          sql`NOT (${generusTable.status} ?| ${new Param(["GPS"])})`
        )
      );

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Absensi Gps", error);
    throw InternalError;
  }
}

export async function getCountAbsensiGps(
  desaId: number,
  kelasPengajian: string
) {
  try {
    const [data] = await db
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
          sql`NOT (${generusTable.status} ?| ${new Param(["GPS"])})`,
          eq(kelasGpsTable.nama, kelasPengajian)
        )
      );

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function getCountGps(desaId: number) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        sql`NOT (${generusTable.status} ?| ${new Param(["GPS"])})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Gps", error);
    throw InternalError;
  }
}

export async function getAllGpsSummary(
  desaId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.desaId, desaId),
    sql`NOT (${generusTable.status} ?| ${new Param(["GPS"])})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
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
    .groupBy(generusTable.id, generusTable.nama);

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Gps Summary", error);
    throw InternalError;
  }
}

export async function getCountGpsAbsensi(
  desaId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        eq(generusTable.kelasPengajian, kelasPengajian),
        sql`NOT (${generusTable.status} ?| ${new Param(["GPS"])})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function createAbsensiGps(
  kelasId: number,
  desaId: number,
  data: TAbsensiGpsCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.desaId !== desaId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di daerah ini",
      });
    }

    return await db.insert(absensiGenerusGpsTable).values({
      ...data,
      kelasId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Generus Gps", error);
    throw InternalError;
  }
}

export async function updateAbsensiGps(
  id: number,
  kelasId: number,
  desaId: number,
  data: TAbsensiGpsCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.desaId !== desaId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di kelompok ini",
      });
    }

    return await db
      .update(absensiGenerusGpsTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusGpsTable.id, id),
          eq(absensiGenerusGpsTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Gps", error);
    throw InternalError;
  }
}
export async function deleteAbsensiGps(id: number[], kelasId: number) {
  try {
    return await db
      .delete(absensiGenerusGpsTable)
      .where(
        and(
          inArray(absensiGenerusGpsTable.id, id),
          eq(absensiGenerusGpsTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Gps", error);
    throw InternalError;
  }
}
