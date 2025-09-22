import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasKeputrianTable } from "~~/server/database/schema/keputrian";
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
    eq(kelasKeputrianTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(kelasKeputrianTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasKeputrianTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasKeputrianTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasKeputrianTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasKeputrianTable.id,
      nama: kelasKeputrianTable.nama,
      tanggal: kelasKeputrianTable.tanggal,
    })
    .from(kelasKeputrianTable)
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

export async function getAllKelasKeputrianExport(daerahId: number) {
  return await db
    .select({
      nama: kelasKeputrianTable.nama,
      tanggal: kelasKeputrianTable.tanggal,
    })
    .from(kelasKeputrianTable)
    .where(eq(kelasKeputrianTable.daerahId, daerahId));
}

export async function getKelasKeputrianById(id: number) {
  const data = await db.query.kelasKeputrianTable.findFirst({
    where: eq(kelasKeputrianTable.id, id),
  });

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Kelas Keputrian By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasKeputrianOptions(
  daerahId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasKeputrianTable.daerahId, daerahId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasKeputrianTable.nama, query.nama));
  }

  const data = await db
    .select({
      id: kelasKeputrianTable.id,
      nama: kelasKeputrianTable.nama,
      tanggal: kelasKeputrianTable.tanggal,
    })
    .from(kelasKeputrianTable)
    .where(and(...conditions));

  try {
    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get List All Kelas Keputrian", error);
    throw InternalError;
  }
}

export async function getCountKelasKeputrian(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      kelasKeputrianTable,
      and(
        eq(kelasKeputrianTable.daerahId, daerahId),
        eq(kelasKeputrianTable.nama, kelasPengajian)
      )
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Keputrian", error);
    throw InternalError;
  }
}

export async function createKelasKeputrian(
  daerahId: number,
  data: TNamaTanggal
) {
  try {
    return await db.insert(kelasKeputrianTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Keputrian", error);
    throw InternalError;
  }
}

export async function updateKelasKeputrian(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(kelasKeputrianTable)
      .set(data)
      .where(
        and(
          eq(kelasKeputrianTable.id, id),
          eq(kelasKeputrianTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Kelas Keputrian", error);
    throw InternalError;
  }
}

export async function deleteKelasKeputrian(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(kelasKeputrianTable)
      .where(
        and(
          inArray(kelasKeputrianTable.id, id),
          eq(kelasKeputrianTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Kelas Keputrian", error);
    throw InternalError;
  }
}
