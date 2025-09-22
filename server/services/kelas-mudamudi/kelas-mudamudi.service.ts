import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasMudaMudiTable } from "~~/server/database/schema/mudamudi";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasKeptrian(
  daerahId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasMudaMudiTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(kelasMudaMudiTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasMudaMudiTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasMudaMudiTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasMudaMudiTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasMudaMudiTable.id,
      nama: kelasMudaMudiTable.nama,
      tanggal: kelasMudaMudiTable.tanggal,
    })
    .from(kelasMudaMudiTable)
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

export async function getAllKelasMudamudiExport(daerahId: number) {
  return await db
    .select({
      nama: kelasMudaMudiTable.nama,
      tanggal: kelasMudaMudiTable.tanggal,
    })
    .from(kelasMudaMudiTable)
    .where(eq(kelasMudaMudiTable.daerahId, daerahId));
}

export async function getKelasMudamudiById(id: number) {
  const data = await db.query.kelasMudaMudiTable.findFirst({
    where: eq(kelasMudaMudiTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas Mudamudi By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasMudamudiOptions(
  daerahId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasMudaMudiTable.daerahId, daerahId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasMudaMudiTable.nama, query.nama));
  }

  const data = await db
    .select({
      id: kelasMudaMudiTable.id,
      nama: kelasMudaMudiTable.nama,
      tanggal: kelasMudaMudiTable.tanggal,
    })
    .from(kelasMudaMudiTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas Mudamudi", error);
    throw InternalError;
  }
}

export async function getCountKelasMudamudi(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      kelasMudaMudiTable,
      and(
        eq(kelasMudaMudiTable.daerahId, daerahId),
        eq(kelasMudaMudiTable.nama, kelasPengajian)
      )
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Mudamudi", error);
    throw InternalError;
  }
}

export async function createKelasMudamudi(
  daerahId: number,
  data: TNamaTanggal
) {
  try {
    return await db.insert(kelasMudaMudiTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Mudamudi", error);
    throw InternalError;
  }
}

export async function updateKelasMudamudi(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(kelasMudaMudiTable)
      .set(data)
      .where(
        and(
          eq(kelasMudaMudiTable.id, id),
          eq(kelasMudaMudiTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Kelas Mudamudi", error);
    throw InternalError;
  }
}

export async function deleteKelasMudamudi(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(kelasMudaMudiTable)
      .where(
        and(
          inArray(kelasMudaMudiTable.id, id),
          eq(kelasMudaMudiTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Kelas Mudamudi", error);
    throw InternalError;
  }
}
