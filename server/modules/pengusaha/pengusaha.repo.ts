import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengusahaTable } from "~~/server/database/schema/kemandirian";
import type { TSearchPagination } from "~~/server/utils/dto";
import type { TPengusahaCreate } from "./pengusaha.dto";

export async function getAllPengusaha(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengusahaTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(
      or(
        like(pengusahaTable.nama, searchCondition),
        like(pengusahaTable.bidangPekerjaan, searchCondition),
        like(pengusahaTable.namaUsaha, searchCondition),
        like(pengusahaTable.noTelepon, searchCondition)
      )
    );
  }

  const query = db
    .select({
      id: pengusahaTable.id,
      nama: pengusahaTable.nama,
      bidangPekerjaan: pengusahaTable.bidangPekerjaan,
      namaUsaha: pengusahaTable.namaUsaha,
      noTelepon: pengusahaTable.noTelepon,
    })
    .from(pengusahaTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total pengusaha",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list pengusaha",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllPengusahaExport(daerahId: number) {
  return await tryCatch(
    "Failed to export pengusaha",
    db
      .select({
        nama: pengusahaTable.nama,
        bidangPekerjaan: pengusahaTable.bidangPekerjaan,
        namaUsaha: pengusahaTable.namaUsaha,
        noTelepon: pengusahaTable.noTelepon,
      })
      .from(pengusahaTable)
      .where(eq(pengusahaTable.daerahId, daerahId))
  );
}

export async function getCountPengusaha(daerahId: number) {
  return await tryCatch(
    "Failed to get count pengusaha",
    db.$count(pengusahaTable, eq(pengusahaTable.daerahId, daerahId))
  );
}

export async function createPengusaha(
  daerahId: number,
  data: TPengusahaCreate
) {
  await tryCatch(
    "Failed to create pengusaha",
    db.insert(pengusahaTable).values({ ...data, daerahId })
  );
}

export async function updatePengusaha(
  id: number,
  daerahId: number,
  data: TPengusahaCreate
) {
  await tryCatch(
    "Failed to update pengusaha",
    db
      .update(pengusahaTable)
      .set(data)
      .where(
        and(eq(pengusahaTable.id, id), eq(pengusahaTable.daerahId, daerahId))
      )
  );
}

export async function deletePengusaha(daerahId: number, id: number[]) {
  await tryCatch(
    "Failed to delete pengusaha",
    db
      .delete(pengusahaTable)
      .where(
        and(
          inArray(pengusahaTable.id, id),
          eq(pengusahaTable.daerahId, daerahId)
        )
      )
  );
}
