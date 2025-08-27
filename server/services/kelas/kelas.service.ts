import { and, count, eq, inArray, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTable } from "~~/server/database/schema/generus";
import type { TKelasCreate, TKelasList } from "./dto/kelas.dto";

export async function getAllKelas(
  kelompokId: number,
  { limit, page, nama, bulan, tahun }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
  ];

  if (nama) {
    conditions.push(eq(kelasTable.nama, nama));
  }
  if (tahun) {
    conditions.push(eq(sql`strftime('%Y', ${kelasTable.tanggal})`, tahun));
  }
  if (bulan) {
    conditions.push(eq(sql`strftime('%m', ${kelasTable.tanggal})`, bulan));
  }

  const query = db
    .select({
      id: kelasTable.id,
      nama: kelasTable.nama,
      tanggal: kelasTable.tanggal,
    })
    .from(kelasTable)
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
    console.error("Failed to get List Kelas", error);
    throw InternalError;
  }
}

export async function getKelasById(id: number) {
  const data = await db.query.kelasTable.findFirst({
    where: eq(kelasTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasOptions(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
  ];

  const data = await db
    .select({
      id: kelasTable.id,
      nama: kelasTable.nama,
      tanggal: kelasTable.tanggal,
    })
    .from(kelasTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas", error);
    throw InternalError;
  }
}

export async function getCountKelas(kelompokId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(kelasTable)
      .where(eq(kelasTable.kelompokId, kelompokId));

    return data.count;
  } catch (error) {
    console.error("Failed to get Count Kelas", error);
    throw InternalError;
  }
}

export async function createKelas(kelompokId: number, data: TKelasCreate) {
  try {
    return await db.insert(kelasTable).values({
      ...data,
      kelompokId,
    });
  } catch (error) {
    console.error("Failed to create Kelas", error);
    throw InternalError;
  }
}

export async function updateKelas(
  id: number,
  kelompokId: number,
  data: TKelasCreate
) {
  try {
    return await db
      .update(kelasTable)
      .set(data)
      .where(and(eq(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId)));
  } catch (error) {
    console.error("Failed to Update Kelas", error);
    throw InternalError;
  }
}

export async function deleteKelas(kelompokId: number, id: number[]) {
  try {
    return await db
      .delete(kelasTable)
      .where(
        and(inArray(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId))
      );
  } catch (error) {
    console.error("Failed to delete Kelas", error);
    throw InternalError;
  }
}
