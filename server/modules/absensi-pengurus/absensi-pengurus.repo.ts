import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiPengurusTable,
  musyawarahTable,
} from "~~/server/database/schema/pengurus";
import type { TAbsensiPengurusCreate } from "./absensi-pengurus.dto";

// NOTE: tryCatch and InternalError are assumed to be defined and imported from a utility file.

export async function getAbsensiPengurusByMusyawarahId(
  daerahId: number,
  musyawarahId: number
) {
  const data = await tryCatch(
    "Failed to get Absensi Pengurus",
    db
      .select({
        id: absensiPengurusTable.id,
        pengurusId: absensiPengurusTable.pengurusId,
        detail: absensiPengurusTable.detail,
        keterangan: absensiPengurusTable.keterangan,
      })
      .from(absensiPengurusTable)
      .leftJoin(
        musyawarahTable,
        eq(absensiPengurusTable.musyawarahId, musyawarahTable.id)
      )
      .where(
        and(
          eq(absensiPengurusTable.musyawarahId, musyawarahId),
          eq(musyawarahTable.daerahId, daerahId)
        )
      )
  );

  return {
    data,
  };
}

export async function getCountAbsensiPengurus(daerahId: number) {
  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        count: count(),
      })
      .from(absensiPengurusTable)
      .leftJoin(
        musyawarahTable,
        eq(absensiPengurusTable.musyawarahId, musyawarahTable.id)
      )
      .where(eq(musyawarahTable.daerahId, daerahId))
  );

  return data!.count;
}

export async function createAbsensiPengurus(
  musyawarahId: number,
  data: TAbsensiPengurusCreate
) {
  return await tryCatch(
    "Failed to create Absensi Pengurus",
    db.insert(absensiPengurusTable).values({
      ...data,
      musyawarahId,
    })
  );
}

export async function updateAbsensiPengurus(
  id: number,
  musyawarahId: number,
  data: TAbsensiPengurusCreate
) {
  return await tryCatch(
    "Failed to Update Absensi Pengurus",
    db
      .update(absensiPengurusTable)
      .set(data)
      .where(
        and(
          eq(absensiPengurusTable.id, id),
          eq(absensiPengurusTable.musyawarahId, musyawarahId)
        )
      )
  );
}

export async function deleteAbsensiPengurus(
  id: number[],
  musyawarahId: number
) {
  return await tryCatch(
    "Failed to delete Absensi Pengurus",
    db
      .delete(absensiPengurusTable)
      .where(
        and(
          inArray(absensiPengurusTable.id, id),
          eq(absensiPengurusTable.musyawarahId, musyawarahId)
        )
      )
  );
}
