import { and, count, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { musyawarahMuslimunTable } from "~~/server/database/schema/kelompok";
import type { TMuslimunCreate, TMuslimunList } from "./dto/muslimun.dto";

export async function getAllMuslimun(
  kelompokId: number,
  { limit, page, search, tahun }: TMuslimunList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahMuslimunTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(musyawarahMuslimunTable.nama, searchCondition)));
  }
  if (tahun) {
    conditions.push(
      eq(sql`strftime('%Y', ${musyawarahMuslimunTable.tanggal})`, tahun)
    );
  }

  const query = db
    .select({
      id: musyawarahMuslimunTable.id,
      nama: musyawarahMuslimunTable.nama,
      tanggal: musyawarahMuslimunTable.tanggal,
    })
    .from(musyawarahMuslimunTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Muslimun", error);
    throw InternalError;
  }
}

export async function getMuslimunById(id: number) {
  const data = await db.query.musyawarahMuslimunTable.findFirst({
    where: eq(musyawarahMuslimunTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Muslimun By Id", error);
    throw InternalError;
  }
}

export async function getAllMuslimunOptions(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahMuslimunTable.kelompokId, kelompokId),
  ];

  const data = await db
    .select({
      id: musyawarahMuslimunTable.id,
      nama: musyawarahMuslimunTable.nama,
      tanggal: musyawarahMuslimunTable.tanggal,
    })
    .from(musyawarahMuslimunTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Muslimun", error);
    throw InternalError;
  }
}

export async function getCountMuslimun(kelompokId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(musyawarahMuslimunTable)
      .where(eq(musyawarahMuslimunTable.kelompokId, kelompokId));

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Muslimun", error);
    throw InternalError;
  }
}

export async function createMuslimun(
  kelompokId: number,
  data: TMuslimunCreate
) {
  try {
    return await db.insert(musyawarahMuslimunTable).values({
      ...data,
      kelompokId,
    });
  } catch (error) {
    console.error("Failed to create Muslimun", error);
    throw InternalError;
  }
}

export async function updateMuslimun(
  id: number,
  kelompokId: number,
  data: TMuslimunCreate
) {
  try {
    return await db
      .update(musyawarahMuslimunTable)
      .set(data)
      .where(
        and(
          eq(musyawarahMuslimunTable.id, id),
          eq(musyawarahMuslimunTable.kelompokId, kelompokId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Muslimun", error);
    throw InternalError;
  }
}

export async function deleteMuslimun(kelompokId: number, id: number[]) {
  try {
    return await db
      .delete(musyawarahMuslimunTable)
      .where(
        and(
          inArray(musyawarahMuslimunTable.id, id),
          eq(musyawarahMuslimunTable.kelompokId, kelompokId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Muslimun", error);
    throw InternalError;
  }
}
