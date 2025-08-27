import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiPengurusTable,
  musyawarahTable,
} from "~~/server/database/schema/pengurus";
import type { TAbsensiPengurusCreate } from "./dto/absensi-pengurus.dto";

export async function getAbsensiPengurusByMusyawarahId(
  daerahId: number,
  musyawarahId: number
) {
  try {
    const data = await db
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
      );

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Absensi Pengurus", error);
    throw InternalError;
  }
}

export async function getCountAbsensi(daerahId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(absensiPengurusTable)
      .leftJoin(
        musyawarahTable,
        eq(absensiPengurusTable.musyawarahId, musyawarahTable.id)
      )
      .where(eq(musyawarahTable.daerahId, daerahId));

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function createAbsensiPengurus(
  musyawarahId: number,
  data: TAbsensiPengurusCreate
) {
  try {
    return await db.insert(absensiPengurusTable).values({
      ...data,
      musyawarahId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Pengurus", error);
    throw InternalError;
  }
}

export async function updateAbsensiPengurus(
  id: number,
  musyawarahId: number,
  data: TAbsensiPengurusCreate
) {
  try {
    return await db
      .update(absensiPengurusTable)
      .set(data)
      .where(
        and(
          eq(absensiPengurusTable.id, id),
          eq(absensiPengurusTable.musyawarahId, musyawarahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Pengurus", error);
    throw InternalError;
  }
}

export async function deleteAbsensiPengurus(
  id: number[],
  musyawarahId: number
) {
  try {
    return await db
      .delete(absensiPengurusTable)
      .where(
        and(
          inArray(absensiPengurusTable.id, id),
          eq(absensiPengurusTable.musyawarahId, musyawarahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Pengurus", error);
    throw InternalError;
  }
}
