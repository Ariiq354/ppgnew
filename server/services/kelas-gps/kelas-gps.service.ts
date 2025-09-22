import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasGpsTable } from "~~/server/database/schema/desa";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasGps(
  desaId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasGpsTable.desaId, desaId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(kelasGpsTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasGpsTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasGpsTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasGpsTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasGpsTable.id,
      nama: kelasGpsTable.nama,
      tanggal: kelasGpsTable.tanggal,
    })
    .from(kelasGpsTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Kelas Gps", error);
    throw InternalError;
  }
}

export async function getAllKelasGpsExport(desaId: number) {
  return await db
    .select({
      nama: kelasGpsTable.nama,
      tanggal: kelasGpsTable.tanggal,
    })
    .from(kelasGpsTable)
    .where(eq(kelasGpsTable.desaId, desaId));
}

export async function getKelasGpsById(id: number) {
  const data = await db.query.kelasGpsTable.findFirst({
    where: eq(kelasGpsTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas Gps By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasGpsOptions(
  desaId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasGpsTable.desaId, desaId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasGpsTable.nama, query.nama));
  }

  const data = await db
    .select({
      id: kelasGpsTable.id,
      nama: kelasGpsTable.nama,
      tanggal: kelasGpsTable.tanggal,
    })
    .from(kelasGpsTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas Gps", error);
    throw InternalError;
  }
}

export async function getCountKelasGps(
  desaId: number,
  kelasGpsPengajian: string
) {
  try {
    return await db.$count(
      kelasGpsTable,
      and(
        eq(kelasGpsTable.desaId, desaId),
        eq(kelasGpsTable.nama, kelasGpsPengajian)
      )
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Gps", error);
    throw InternalError;
  }
}

export async function createKelasGps(desaId: number, data: TNamaTanggal) {
  try {
    return await db.insert(kelasGpsTable).values({
      ...data,
      desaId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Gps", error);
    throw InternalError;
  }
}

export async function updateKelasGps(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(kelasGpsTable)
      .set(data)
      .where(and(eq(kelasGpsTable.id, id), eq(kelasGpsTable.desaId, desaId)));
  } catch (error) {
    console.error("Failed to Update Kelas Gps", error);
    throw InternalError;
  }
}

export async function deleteKelasGps(desaId: number, id: number[]) {
  try {
    return await db
      .delete(kelasGpsTable)
      .where(
        and(inArray(kelasGpsTable.id, id), eq(kelasGpsTable.desaId, desaId))
      );
  } catch (error) {
    console.error("Failed to delete Kelas Gps", error);
    throw InternalError;
  }
}
