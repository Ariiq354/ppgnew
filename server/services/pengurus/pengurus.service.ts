import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiPengurusTable,
  pengurusTable,
} from "~~/server/database/schema/pengurus";
import type { TSearchPagination } from "~~/server/utils/dto";
import type { TPengurusCreate } from "./dto/pengurus.dto";

export async function getAllPengurus(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengurusTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(pengurusTable.nama, searchCondition),
        like(pengurusTable.pendidikan, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: pengurusTable.id,
      nama: pengurusTable.nama,
      pendidikan: pengurusTable.pendidikan,
      bidang: pengurusTable.bidang,
      foto: pengurusTable.foto,
      tempatLahir: pengurusTable.tempatLahir,
      tanggalLahir: pengurusTable.tanggalLahir,
    })
    .from(pengurusTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Pengurus", error);
    throw InternalError;
  }
}

export async function getAllPengurusExport(daerahId: number) {
  return await db
    .select({
      nama: pengurusTable.nama,
      pendidikan: pengurusTable.pendidikan,
      bidang: pengurusTable.bidang,
      foto: pengurusTable.foto,
      tempatLahir: pengurusTable.tempatLahir,
      tanggalLahir: pengurusTable.tanggalLahir,
    })
    .from(pengurusTable)
    .where(eq(pengurusTable.daerahId, daerahId));
}

export async function getAllPengurusAbsensi(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengurusTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(pengurusTable.nama, searchCondition),
        like(pengurusTable.pendidikan, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: pengurusTable.id,
      nama: pengurusTable.nama,
      bidang: pengurusTable.bidang,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiPengurusTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiPengurusTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(pengurusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiPengurusTable,
      eq(pengurusTable.id, absensiPengurusTable.pengurusId)
    )
    .groupBy(pengurusTable.id, pengurusTable.nama, pengurusTable.bidang);

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Pengurus", error);
    throw InternalError;
  }
}

export async function getPengurusById(daerahId: number, id: number) {
  try {
    return await db.query.pengurusTable.findFirst({
      where: and(
        eq(pengurusTable.daerahId, daerahId),
        eq(pengurusTable.id, id)
      ),
      columns: {
        id: true,
        foto: true,
      },
    });
  } catch (error) {
    console.error("Failed to get Pengurus By Id", error);
    throw InternalError;
  }
}

export async function getCountPengurus(daerahId: number) {
  try {
    return await db.$count(pengurusTable, eq(pengurusTable.daerahId, daerahId));
  } catch (error) {
    console.error("Failed to get Count Pengurus", error);
    throw InternalError;
  }
}

export async function createPengurus(daerahId: number, data: TPengurusCreate) {
  try {
    return await db.insert(pengurusTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Pengurus", error);
    throw InternalError;
  }
}

export async function updatePengurus(
  id: number,
  daerahId: number,
  data: TPengurusCreate
) {
  try {
    return await db
      .update(pengurusTable)
      .set(data)
      .where(
        and(eq(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
      );
  } catch (error) {
    console.error("Failed to Update Pengurus", error);
    throw InternalError;
  }
}

export async function deletePengurus(daerahId: number, id: number[]) {
  try {
    return await db
      .delete(pengurusTable)
      .where(
        and(inArray(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
      );
  } catch (error) {
    console.error("Failed to delete Pengurus", error);
    throw InternalError;
  }
}
