import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTahfidzTable } from "~~/server/database/schema/tahfidz";
import type {
  TKelasTahfidzList,
  TKelasTahfidzOptionsList,
} from "./dto/kelas-tahfidz.dto";
import type { TNamaTanggal } from "~~/server/utils/dto";

export async function getAllKelasKeptrian(
  daerahId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasTahfidzList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTahfidzTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(kelasTahfidzTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasTahfidzTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasTahfidzTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasTahfidzTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasTahfidzTable.id,
      nama: kelasTahfidzTable.nama,
      tanggal: kelasTahfidzTable.tanggal,
    })
    .from(kelasTahfidzTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
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

export async function getAllKelasTahfidzExport(daerahId: number) {
  return await db
    .select({
      nama: kelasTahfidzTable.nama,
      tanggal: kelasTahfidzTable.tanggal,
    })
    .from(kelasTahfidzTable)
    .where(eq(kelasTahfidzTable.daerahId, daerahId));
}

export async function getKelasTahfidzById(id: number) {
  const data = await db.query.kelasTahfidzTable.findFirst({
    where: eq(kelasTahfidzTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas Tahfidz By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasTahfidzOptions(
  daerahId: number,
  query: TKelasTahfidzOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTahfidzTable.daerahId, daerahId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasTahfidzTable.nama, query.nama));
  }

  const data = await db
    .select({
      id: kelasTahfidzTable.id,
      nama: kelasTahfidzTable.nama,
      tanggal: kelasTahfidzTable.tanggal,
    })
    .from(kelasTahfidzTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas Tahfidz", error);
    throw InternalError;
  }
}

export async function getCountKelasTahfidz(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      kelasTahfidzTable,
      and(
        eq(kelasTahfidzTable.daerahId, daerahId),
        eq(kelasTahfidzTable.nama, kelasPengajian)
      )
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Tahfidz", error);
    throw InternalError;
  }
}

export async function createKelasTahfidz(daerahId: number, data: TNamaTanggal) {
  try {
    return await db.insert(kelasTahfidzTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Tahfidz", error);
    throw InternalError;
  }
}

export async function updateKelasTahfidz(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(kelasTahfidzTable)
      .set(data)
      .where(
        and(
          eq(kelasTahfidzTable.id, id),
          eq(kelasTahfidzTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Kelas Tahfidz", error);
    throw InternalError;
  }
}

export async function deleteKelasTahfidz(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(kelasTahfidzTable)
      .where(
        and(
          inArray(kelasTahfidzTable.id, id),
          eq(kelasTahfidzTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Kelas Tahfidz", error);
    throw InternalError;
  }
}
