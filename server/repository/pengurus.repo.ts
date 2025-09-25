import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiPengurusTable,
  pengurusTable,
} from "~~/server/database/schema/pengurus";
import type { TSearchPagination } from "~~/server/utils/dto";
import type { TPengurusCreate } from "../api/v1/pengurus/_dto";

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

  const total = assertNoErr(
    "Failed to get total Pengurus",
    await to(db.$count(query))
  );
  const data = assertNoErr(
    "Failed to get data Pengurus",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllPengurusExport(daerahId: number) {
  return assertNoErr(
    "Failed to export pengurus",
    await to(
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
    )
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

  const total = assertNoErr(
    "Failed to get total Pengurus",
    await to(db.$count(query))
  );
  const data = assertNoErr(
    "Failed to get data Pengurus",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getPengurusById(daerahId: number, id: number) {
  return assertNoErr(
    "Failed to get Pengurus by id",
    await to(
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
    )
  );
}

export async function getCountPengurus(daerahId: number) {
  return assertNoErr(
    "Failed to count Pengurus",
    await to(db.$count(pengurusTable, eq(pengurusTable.daerahId, daerahId)))
  );
}

export async function createPengurus(daerahId: number, data: TPengurusCreate) {
  assertNoErr(
    "Failed to create Pengurus",
    await to(
      db.insert(pengurusTable).values({
        ...data,
        daerahId,
      })
    )
  );
}

export async function updatePengurus(
  id: number,
  daerahId: number,
  data: TPengurusCreate
) {
  assertNoErr(
    "Failed to update Pengurus",
    await to(
      db
        .update(pengurusTable)
        .set(data)
        .where(
          and(eq(pengurusTable.id, id), eq(pengurusTable.daerahId, daerahId))
        )
    )
  );
}

export async function deletePengurus(daerahId: number, id: number[]) {
  assertNoErr(
    "Failed to delete Pengurus",
    await to(
      db
        .delete(pengurusTable)
        .where(
          and(
            inArray(pengurusTable.id, id),
            eq(pengurusTable.daerahId, daerahId)
          )
        )
    )
  );
}
