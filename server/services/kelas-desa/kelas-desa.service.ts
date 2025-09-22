import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasDesaTable } from "~~/server/database/schema/desa";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasDesa(
  desaId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasDesaTable.desaId, desaId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(kelasDesaTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasDesaTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasDesaTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasDesaTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasDesaTable.id,
      nama: kelasDesaTable.nama,
      tanggal: kelasDesaTable.tanggal,
    })
    .from(kelasDesaTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Kelas Desa", error);
    throw InternalError;
  }
}

export async function getAllKelasDesaExport(desaId: number) {
  return await db
    .select({
      nama: kelasDesaTable.nama,
      tanggal: kelasDesaTable.tanggal,
    })
    .from(kelasDesaTable)
    .where(eq(kelasDesaTable.desaId, desaId));
}

export async function getKelasDesaById(id: number) {
  const data = await db.query.kelasDesaTable.findFirst({
    where: eq(kelasDesaTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas Desa By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasDesaOptions(
  desaId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasDesaTable.desaId, desaId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasDesaTable.nama, query.nama));
  }

  const data = await db
    .select({
      id: kelasDesaTable.id,
      nama: kelasDesaTable.nama,
      tanggal: kelasDesaTable.tanggal,
    })
    .from(kelasDesaTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas Desa", error);
    throw InternalError;
  }
}

export async function getCountKelasDesa(
  desaId: number,
  kelasDesaPengajian: string
) {
  try {
    return await db.$count(
      kelasDesaTable,
      and(
        eq(kelasDesaTable.desaId, desaId),
        eq(kelasDesaTable.nama, kelasDesaPengajian)
      )
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Desa", error);
    throw InternalError;
  }
}

export async function createKelasDesa(desaId: number, data: TNamaTanggal) {
  try {
    return await db.insert(kelasDesaTable).values({
      ...data,
      desaId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Desa", error);
    throw InternalError;
  }
}

export async function updateKelasDesa(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(kelasDesaTable)
      .set(data)
      .where(and(eq(kelasDesaTable.id, id), eq(kelasDesaTable.desaId, desaId)));
  } catch (error) {
    console.error("Failed to Update Kelas Desa", error);
    throw InternalError;
  }
}

export async function deleteKelasDesa(desaId: number, id: number[]) {
  try {
    return await db
      .delete(kelasDesaTable)
      .where(
        and(inArray(kelasDesaTable.id, id), eq(kelasDesaTable.desaId, desaId))
      );
  } catch (error) {
    console.error("Failed to delete Kelas Desa", error);
    throw InternalError;
  }
}
