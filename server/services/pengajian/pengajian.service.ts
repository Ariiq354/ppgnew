import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajianTable } from "~~/server/database/schema/kelompok";
import type { TNamaTanggal, TSearchPagination } from "~~/server/utils/dto";

export async function getAllPengajian(
  kelompokId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajianTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(pengajianTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: pengajianTable.id,
      nama: pengajianTable.nama,
      tanggal: pengajianTable.tanggal,
    })
    .from(pengajianTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Pengajian", error);
    throw InternalError;
  }
}

export async function getAllPengajianExport(kelompokId: number) {
  return await db
    .select({
      nama: pengajianTable.nama,
      tanggal: pengajianTable.tanggal,
    })
    .from(pengajianTable)
    .where(eq(pengajianTable.kelompokId, kelompokId));
}

export async function getPengajianById(id: number) {
  const data = await db.query.pengajianTable.findFirst({
    where: eq(pengajianTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas Kelompok By Id", error);
    throw InternalError;
  }
}

export async function getAllPengajianOptions(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajianTable.kelompokId, kelompokId),
  ];

  const data = await db
    .select({
      id: pengajianTable.id,
      nama: pengajianTable.nama,
      tanggal: pengajianTable.tanggal,
    })
    .from(pengajianTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function getCountPengajian(kelompokId: number) {
  try {
    return await db.$count(
      pengajianTable,
      eq(pengajianTable.kelompokId, kelompokId)
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function createPengajian(kelompokId: number, data: TNamaTanggal) {
  try {
    return await db.insert(pengajianTable).values({
      ...data,
      kelompokId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function updatePengajian(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(pengajianTable)
      .set(data)
      .where(
        and(
          eq(pengajianTable.id, id),
          eq(pengajianTable.kelompokId, kelompokId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function deletePengajian(kelompokId: number, id: number[]) {
  try {
    return await db
      .delete(pengajianTable)
      .where(
        and(
          inArray(pengajianTable.id, id),
          eq(pengajianTable.kelompokId, kelompokId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Kelas Kelompok", error);
    throw InternalError;
  }
}
