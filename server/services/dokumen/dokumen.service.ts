import { eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { dokumenTable } from "~~/server/database/schema/dokumen";
import type { TPagination } from "~~/server/utils/dto";
import type { TDokumenCreate } from "./dokumen.dto";

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

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Dokumen", error);
    throw InternalError;
  }
}

export async function getDokumenById(id: number) {
  try {
    return await db.query.dokumenTable.findFirst({
      where: eq(dokumenTable.id, id),
    });
  } catch (error) {
    console.error("Failed to create Dokumen", error);
    throw InternalError;
  }
}

export async function createDokumen(daerahId: number, data: TDokumenCreate) {
  try {
    return await db.insert(dokumenTable).values({ ...data, daerahId });
  } catch (error) {
    console.error("Failed to create Dokumen", error);
    throw InternalError;
  }
}

export async function deleteDokumen(id: number[]) {
  try {
    return await db.delete(dokumenTable).where(inArray(dokumenTable.id, id));
  } catch (error) {
    console.error("Failed to delete Dokumen", error);
    throw InternalError;
  }
}
