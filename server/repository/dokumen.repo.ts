import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { dokumenTable } from "~~/server/database/schema/dokumen";
import type { TPagination } from "~~/server/utils/dto";
import type { TDokumenCreate } from "../api/v1/dokumen/_dto";

export async function getAllDokumen(
  daerahId: number,
  { limit, page }: TPagination
) {
  const offset = (page - 1) * limit;
  const query = db
    .select({
      id: dokumenTable.id,
      name: dokumenTable.name,
      url: dokumenTable.url,
      size: dokumenTable.size,
      type: dokumenTable.type,
      createdAt: dokumenTable.createdAt,
    })
    .from(dokumenTable)
    .where(eq(dokumenTable.daerahId, daerahId));

  const total = await tryCatch(
    "Failed to get total dokumen",
    await to(db.$count(query))
  );
  const data = await tryCatch(
    "Failed to get data dokumen",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getDokumenById(id: number) {
  return await tryCatch(
    "Failed to get Dokumen by id",
    await to(
      db.query.dokumenTable.findFirst({
        where: eq(dokumenTable.id, id),
      })
    )
  );
}

export async function createDokumen(daerahId: number, data: TDokumenCreate) {
  await tryCatch(
    "Failed to create Dokumen",
    await to(db.insert(dokumenTable).values({ ...data, daerahId }))
  );
}

export async function deleteDokumen(id: number[]) {
  await tryCatch(
    "Failed to delete Dokumen",
    await to(db.delete(dokumenTable).where(inArray(dokumenTable.id, id)))
  );
}
