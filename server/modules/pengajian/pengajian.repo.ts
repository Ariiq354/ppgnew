import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajianTable } from "~~/server/database/schema/kelompok";
import type { TSearchPagination } from "~~/server/utils/dto/common.dto";

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

  const total = await tryCatch(
    "Failed to get total count of Pengajian",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Pengajian",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllPengajianExport(kelompokId: number) {
  return await tryCatch(
    "Failed to get all Pengajian for export",
    db
      .select({
        nama: pengajianTable.nama,
        tanggal: pengajianTable.tanggal,
      })
      .from(pengajianTable)
      .where(eq(pengajianTable.kelompokId, kelompokId))
  );
}

// Untuk Absensi Pengajian
export async function getPengajianById(id: number) {
  const data = await tryCatch(
    "Failed to get Pengajian By Id",
    db.query.pengajianTable.findFirst({
      where: eq(pengajianTable.id, id),
    })
  );
  return { data };
}

export async function getAllPengajianOptions(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajianTable.kelompokId, kelompokId),
  ];

  const data = await tryCatch(
    "Failed to get all Pengajian options",
    db
      .select({
        id: pengajianTable.id,
        nama: pengajianTable.nama,
        tanggal: pengajianTable.tanggal,
      })
      .from(pengajianTable)
      .where(and(...conditions))
  );

  return { data };
}

// Untuk Summary Absensi
export async function getCountPengajian(kelompokId: number) {
  return await tryCatch(
    "Failed to get count of Pengajian",
    db.$count(pengajianTable, eq(pengajianTable.kelompokId, kelompokId))
  );
}

export async function createPengajian(kelompokId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Pengajian",
    db.insert(pengajianTable).values({
      ...data,
      kelompokId,
    })
  );
}

export async function updatePengajian(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Pengajian",
    db
      .update(pengajianTable)
      .set(data)
      .where(
        and(
          eq(pengajianTable.id, id),
          eq(pengajianTable.kelompokId, kelompokId)
        )
      )
  );
}

export async function deletePengajian(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Pengajian",
    db
      .delete(pengajianTable)
      .where(
        and(
          inArray(pengajianTable.id, id),
          eq(pengajianTable.kelompokId, kelompokId)
        )
      )
  );
}
