import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTable } from "~~/server/database/schema/generus";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelas(
  kelompokId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(kelasTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasTable.id,
      nama: kelasTable.nama,
      tanggal: kelasTable.tanggal,
    })
    .from(kelasTable)
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

export async function getAllKelasExport(kelompokId: number) {
  return await db
    .select({
      nama: kelasTable.nama,
      tanggal: kelasTable.tanggal,
    })
    .from(kelasTable)
    .where(eq(kelasTable.kelompokId, kelompokId));
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
    console.error("Failed to get Kelas Kelompok By Id", error);
    throw InternalError;
  }
}

export async function getAllKelasOptions(
  kelompokId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasTable.nama, query.nama));
  }

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
    console.error("Failed to get List All Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function getCountKelas(
  kelompokId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      kelasTable,
      and(
        eq(kelasTable.kelompokId, kelompokId),
        eq(kelasTable.nama, kelasPengajian)
      )
    );
  } catch (error) {
    console.error("Failed to get Count Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function getKelasByKelompokId(kelompokId: number) {
  try {
    return await db
      .select({
        id: kelasTable.id,
        nama: kelasTable.nama,
      })
      .from(kelasTable)
      .where(eq(kelasTable.kelompokId, kelompokId));
  } catch (error) {
    console.error("Failed to get Kelas By Kelompok Id", error);
    throw InternalError;
  }
}

export async function createKelas(kelompokId: number, data: TNamaTanggal) {
  try {
    return await db.insert(kelasTable).values({
      ...data,
      kelompokId,
    });
  } catch (error) {
    console.error("Failed to create Kelas Kelompok", error);
    throw InternalError;
  }
}

export async function updateKelas(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  try {
    return await db
      .update(kelasTable)
      .set(data)
      .where(and(eq(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId)));
  } catch (error) {
    console.error("Failed to Update Kelas Kelompok", error);
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
    console.error("Failed to delete Kelas Kelompok", error);
    throw InternalError;
  }
}
