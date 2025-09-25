import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengusahaTable } from "~~/server/database/schema/kemandirian";
import type { TSearchPagination } from "~~/server/utils/dto";
import type { TPengusahaCreate } from "../api/v1/pengusaha/_dto";

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

  const total = assertNoErr(
    "Failed to get total pengusaha",
    await to(db.$count(query))
  );

  const data = assertNoErr(
    "Failed to get list pengusaha",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllPengusahaExport(daerahId: number) {
  return assertNoErr(
    "Failed to export pengusaha",
    await to(
      db
        .select({
          nama: pengusahaTable.nama,
          bidangPekerjaan: pengusahaTable.bidangPekerjaan,
          namaUsaha: pengusahaTable.namaUsaha,
          noTelepon: pengusahaTable.noTelepon,
        })
        .from(pengusahaTable)
        .where(eq(pengusahaTable.daerahId, daerahId))
    )
  );
}

export async function getCountPengusaha(daerahId: number) {
  return assertNoErr(
    "Failed to get count pengusaha",
    await to(db.$count(pengusahaTable, eq(pengusahaTable.daerahId, daerahId)))
  );
}

export async function createPengusaha(
  daerahId: number,
  data: TPengusahaCreate
) {
  assertNoErr(
    "Failed to create pengusaha",
    await to(db.insert(pengusahaTable).values({ ...data, daerahId }))
  );
}

export async function updatePengusaha(
  id: number,
  daerahId: number,
  data: TPengusahaCreate
) {
  assertNoErr(
    "Failed to update pengusaha",
    await to(
      db
        .update(pengusahaTable)
        .set(data)
        .where(
          and(eq(pengusahaTable.id, id), eq(pengusahaTable.daerahId, daerahId))
        )
    )
  );
}

export async function deletePengusaha(daerahId: number, id: number[]) {
  assertNoErr(
    "Failed to delete pengusaha",
    await to(
      db
        .delete(pengusahaTable)
        .where(
          and(
            inArray(pengusahaTable.id, id),
            eq(pengusahaTable.daerahId, daerahId)
          )
        )
    )
  );
}
