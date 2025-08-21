import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { prokerTable } from "~~/server/database/schema/bidang";
import { getTotalQuery } from "~~/server/utils/query";
import type { roles } from "~~/shared/permission";
import type { TProkerCreate, TProkerList } from "./dto/proker.dto";

export async function getAllProker(
  daerahId: number,
  { limit, page, search, bidang }: TProkerList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(prokerTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(prokerTable.kegiatan, searchCondition),
        like(prokerTable.keterangan, searchCondition),
        like(prokerTable.peserta, searchCondition)
      )
    );
  }

  if (bidang) {
    conditions.push(eq(prokerTable.bidang, bidang));
  }

  const query = db
    .select({
      biaya: prokerTable.biaya,
      bidang: prokerTable.bidang,
      bulan: prokerTable.bulan,
      id: prokerTable.id,
      kegiatan: prokerTable.kegiatan,
      keterangan: prokerTable.keterangan,
      mingguKe: prokerTable.mingguKe,
      peserta: prokerTable.peserta,
      tahun: prokerTable.tahun,
      status: prokerTable.status,
    })
    .from(prokerTable)
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
    console.error("Failed to get List Proker", error);
    throw InternalError;
  }
}

export async function createProker(daerahId: number, data: TProkerCreate) {
  try {
    return await db.insert(prokerTable).values({
      ...data,
      daerahId,
    });
  } catch (error) {
    console.error("Failed to create Proker", error);
    throw InternalError;
  }
}

export async function updateProker(
  id: number,
  daerahId: number,
  data: TProkerCreate
) {
  try {
    return await db
      .update(prokerTable)
      .set(data)
      .where(and(eq(prokerTable.id, id), eq(prokerTable.daerahId, daerahId)));
  } catch (error) {
    console.error("Failed to Update Proker", error);
    throw InternalError;
  }
}

export async function deleteProker(
  daerahId: number,
  bidang: (typeof roles)[number],
  id: number[]
) {
  try {
    return await db
      .delete(prokerTable)
      .where(
        and(
          inArray(prokerTable.id, id),
          eq(prokerTable.daerahId, daerahId),
          eq(prokerTable.bidang, bidang)
        )
      );
  } catch (error) {
    console.error("Failed to delete Proker", error);
    throw InternalError;
  }
}
