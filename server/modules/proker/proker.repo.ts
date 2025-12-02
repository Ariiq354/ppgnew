import { and, eq, inArray, ilike, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { prokerTable } from "~~/server/database/schema/bidang";
import type { TProkerCreate, TProkerList } from "./proker.dto";
import type { bidangEnum } from "~~/shared/enum";

export async function getAllProker(
  daerahId: number,
  { limit, page, search, bidang, tahun, bulan, mingguKe }: TProkerList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(prokerTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(
      or(
        ilike(prokerTable.kegiatan, searchCondition),
        ilike(prokerTable.keterangan, searchCondition),
        ilike(prokerTable.peserta, searchCondition)
      )
    );
  }

  if (bidang) conditions.push(eq(prokerTable.bidang, bidang));
  if (tahun) conditions.push(eq(prokerTable.tahun, tahun));
  if (bulan) conditions.push(eq(prokerTable.bulan, bulan));
  if (mingguKe) conditions.push(eq(prokerTable.mingguKe, mingguKe));

  const query = db
    .select({
      id: prokerTable.id,
      biaya: prokerTable.biaya,
      bidang: prokerTable.bidang,
      bulan: prokerTable.bulan,
      kegiatan: prokerTable.kegiatan,
      keterangan: prokerTable.keterangan,
      mingguKe: prokerTable.mingguKe,
      peserta: prokerTable.peserta,
      tahun: prokerTable.tahun,
      status: prokerTable.status,
    })
    .from(prokerTable)
    .where(and(...conditions));

  const total = await tryCatch("Failed to count Proker", db.$count(query));
  const data = await tryCatch(
    "Failed to get List Proker",
    query.limit(limit).offset(offset)
  );

  const totalBiaya = await tryCatch(
    "Failed to get total biaya",
    db
      .select({ totalBiaya: sql<number>`SUM(${prokerTable.biaya})` })
      .from(prokerTable)
      .where(and(...conditions))
      .then((res) => res[0]?.totalBiaya ?? 0)
  );

  return { data, total, totalBiaya };
}

export async function getAllProkerExport(
  daerahId: number,
  bidang: (typeof bidangEnum)[number]
) {
  return await tryCatch(
    "Failed to export Proker",
    db
      .select({
        biaya: prokerTable.biaya,
        bidang: prokerTable.bidang,
        bulan: prokerTable.bulan,
        kegiatan: prokerTable.kegiatan,
        keterangan: prokerTable.keterangan,
        mingguKe: prokerTable.mingguKe,
        peserta: prokerTable.peserta,
        tahun: prokerTable.tahun,
        status: prokerTable.status,
      })
      .from(prokerTable)
      .where(
        and(eq(prokerTable.daerahId, daerahId), eq(prokerTable.bidang, bidang))
      )
  );
}

export async function createProker(daerahId: number, data: TProkerCreate) {
  return await tryCatch(
    "Failed to create Proker",
    db.insert(prokerTable).values({
      ...data,
      daerahId,
    })
  );
}

export async function updateProker(
  id: number,
  daerahId: number,
  data: TProkerCreate
) {
  return await tryCatch(
    "Failed to update Proker",
    db
      .update(prokerTable)
      .set(data)
      .where(and(eq(prokerTable.id, id), eq(prokerTable.daerahId, daerahId)))
  );
}

export async function deleteProker(
  daerahId: number,
  bidang: (typeof bidangEnum)[number],
  id: number[]
) {
  return await tryCatch(
    "Failed to delete Proker",
    db
      .delete(prokerTable)
      .where(
        and(
          inArray(prokerTable.id, id),
          eq(prokerTable.daerahId, daerahId),
          eq(prokerTable.bidang, bidang)
        )
      )
  );
}
