import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiPengurusTable,
  pengurusTable,
} from "~~/server/database/schema/pengurus";
import type { TSearchPagination } from "~~/server/utils/dto";
import type { TPengurusCreate } from "./pengurus.dto";

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

  const total = await tryCatch(
    "Failed to get total Pengurus",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get data Pengurus",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllPengurusExport(daerahId: number) {
  return await tryCatch(
    "Failed to export pengurus",
    db
      .select({
        nama: pengurusTable.nama,
        pendidikan: pengurusTable.pendidikan,
        bidang: pengurusTable.bidang,
        foto: pengurusTable.foto,
        tempatLahir: pengurusTable.tempatLahir,
        tanggalLahir: pengurusTable.tanggalLahir,
      })
      .from(pengurusTable)
      .where(eq(pengurusTable.daerahId, daerahId))
  );
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

  const total = await tryCatch(
    "Failed to get total Pengurus",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get data Pengurus",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getPengurusById(daerahId: number, id: number) {
  return await tryCatch(
    "Failed to get Pengurus by id",
    db.query.pengurusTable.findFirst({
      where: and(
        eq(pengurusTable.daerahId, daerahId),
        eq(pengurusTable.id, id)
      ),
      columns: {
        id: true,
        foto: true,
      },
    })
  );
}

export async function getCountPengurus(daerahId: number) {
  return await tryCatch(
    "Failed to count Pengurus",
    db.$count(pengurusTable, eq(pengurusTable.daerahId, daerahId))
  );
}

export async function createPengurus(daerahId: number, data: TPengurusCreate) {
  await tryCatch(
    "Failed to create Pengurus",
    db.insert(pengurusTable).values({
      ...data,
      daerahId,
    })
  );
}

export async function updatePengurus(
  id: number,
  daerahId: number,
  data: TPengurusCreate
) {
  await tryCatch(
    "Failed to update Pengurus",
    db
      .update(pengurusTable)
      .set(data)
      .where(
        and(eq(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
      )
  );
}

export async function deletePengurus(daerahId: number, id: number[]) {
  await tryCatch(
    "Failed to delete Pengurus",
    db
      .delete(pengurusTable)
      .where(
        and(inArray(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
      )
  );
}
