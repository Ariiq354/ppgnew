import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiJamaahKelompokTable,
  jamaahTable,
} from "~~/server/database/schema/kelompok";
import type { TJamaahCreate, TJamaahList, TWilayah } from "./dto/jamaah.dto";

export async function getAllJamaah(
  kelompokId: number,
  { limit, page, search }: TJamaahList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(jamaahTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(jamaahTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: jamaahTable.id,
      nama: jamaahTable.nama,
    })
    .from(jamaahTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Jamaah", error);
    throw InternalError;
  }
}

export async function getAllJamaahExport(kelompokId: number) {
  return await db
    .select({
      nama: jamaahTable.nama,
    })
    .from(jamaahTable)
    .where(eq(jamaahTable.kelompokId, kelompokId));
}

export async function getAllJamaahAbsensi(
  kelompokId: number,
  { limit, page, search }: TJamaahList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(jamaahTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(jamaahTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: jamaahTable.id,
      nama: jamaahTable.nama,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiJamaahKelompokTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiJamaahKelompokTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(jamaahTable)
    .where(and(...conditions))
    .leftJoin(
      absensiJamaahKelompokTable,
      eq(jamaahTable.id, absensiJamaahKelompokTable.jamaahId)
    )
    .groupBy(jamaahTable.id, jamaahTable.nama);

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Jamaah Absensi", error);
    throw InternalError;
  }
}

export async function getCountJamaah(kelompokId: number) {
  try {
    return await db.$count(jamaahTable, eq(jamaahTable.kelompokId, kelompokId));
  } catch (error) {
    console.error("Failed to get Count Jamaah", error);
    throw InternalError;
  }
}

export async function createJamaah(wilayah: TWilayah, data: TJamaahCreate) {
  try {
    return await db.insert(jamaahTable).values({
      ...data,
      ...wilayah,
    });
  } catch (error) {
    console.error("Failed to create Jamaah", error);
    throw InternalError;
  }
}

export async function updateJamaah(
  id: number,
  kelompokId: number,
  data: TJamaahCreate
) {
  try {
    return await db
      .update(jamaahTable)
      .set(data)
      .where(
        and(eq(jamaahTable.id, id), eq(jamaahTable.kelompokId, kelompokId))
      );
  } catch (error) {
    console.error("Failed to Update Jamaah", error);
    throw InternalError;
  }
}

export async function deleteJamaah(kelompokId: number, id: number[]) {
  try {
    return await db
      .delete(jamaahTable)
      .where(
        and(inArray(jamaahTable.id, id), eq(jamaahTable.kelompokId, kelompokId))
      );
  } catch (error) {
    console.error("Failed to delete Jamaah", error);
    throw InternalError;
  }
}
