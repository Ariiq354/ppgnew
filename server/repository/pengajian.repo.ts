import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajianTable } from "~~/server/database/schema/kelompok";
import type { TNamaTanggal, TSearchPagination } from "~~/server/utils/dto";

export async function getAllPengajian(
  kelompokId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajianTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(pengajianTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: pengajianTable.id,
      nama: pengajianTable.nama,
      tanggal: pengajianTable.tanggal,
    })
    .from(pengajianTable)
    .where(and(...conditions));

  const total = assertNoErr(
    "Failed to get total count of Pengajian",
    await to(db.$count(query))
  );

  const data = assertNoErr(
    "Failed to get list of Pengajian",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllPengajianExport(kelompokId: number) {
  return assertNoErr(
    "Failed to get all Pengajian for export",
    await to(
      db
        .select({
          nama: pengajianTable.nama,
          tanggal: pengajianTable.tanggal,
        })
        .from(pengajianTable)
        .where(eq(pengajianTable.kelompokId, kelompokId))
    )
  );
}

export async function getPengajianById(id: number) {
  const data = assertNoErr(
    "Failed to get Pengajian By Id",
    await to(
      db.query.pengajianTable.findFirst({
        where: eq(pengajianTable.id, id),
      })
    )
  );
  return { data };
}

export async function getAllPengajianOptions(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajianTable.kelompokId, kelompokId),
  ];

  const data = assertNoErr(
    "Failed to get all Pengajian options",
    await to(
      db
        .select({
          id: pengajianTable.id,
          nama: pengajianTable.nama,
          tanggal: pengajianTable.tanggal,
        })
        .from(pengajianTable)
        .where(and(...conditions))
    )
  );

  return { data };
}

export async function getCountPengajian(kelompokId: number) {
  return assertNoErr(
    "Failed to get count of Pengajian",
    await to(
      db.$count(pengajianTable, eq(pengajianTable.kelompokId, kelompokId))
    )
  );
}

export async function createPengajian(kelompokId: number, data: TNamaTanggal) {
  return assertNoErr(
    "Failed to create Pengajian",
    await to(
      db.insert(pengajianTable).values({
        ...data,
        kelompokId,
      })
    )
  );
}

export async function updatePengajian(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return assertNoErr(
    "Failed to update Pengajian",
    await to(
      db
        .update(pengajianTable)
        .set(data)
        .where(
          and(
            eq(pengajianTable.id, id),
            eq(pengajianTable.kelompokId, kelompokId)
          )
        )
    )
  );
}

export async function deletePengajian(kelompokId: number, id: number[]) {
  return assertNoErr(
    "Failed to delete Pengajian",
    await to(
      db
        .delete(pengajianTable)
        .where(
          and(
            inArray(pengajianTable.id, id),
            eq(pengajianTable.kelompokId, kelompokId)
          )
        )
    )
  );
}
