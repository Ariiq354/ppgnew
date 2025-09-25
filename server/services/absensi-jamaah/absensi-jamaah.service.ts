import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiJamaahKelompokTable,
  jamaahTable,
  pengajianTable,
} from "~~/server/database/schema/kelompok";
import type { TAbsensiJamaahCreate } from "./absensi-jamaah.dto";

export async function getAbsensiJamaahByPengajianId(
  kelompokId: number,
  pengajianId: number
) {
  try {
    const data = await db
      .select({
        id: absensiJamaahKelompokTable.id,
        jamaahId: absensiJamaahKelompokTable.jamaahId,
        detail: absensiJamaahKelompokTable.detail,
        keterangan: absensiJamaahKelompokTable.keterangan,
      })
      .from(absensiJamaahKelompokTable)
      .leftJoin(
        pengajianTable,
        eq(absensiJamaahKelompokTable.pengajianId, pengajianTable.id)
      )
      .where(
        and(
          eq(absensiJamaahKelompokTable.pengajianId, pengajianId),
          eq(pengajianTable.kelompokId, kelompokId)
        )
      );

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Absensi Jamaah", error);
    throw InternalError;
  }
}

export async function getCountAbsensiJamaah(kelompokId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(absensiJamaahKelompokTable)
      .leftJoin(
        pengajianTable,
        eq(absensiJamaahKelompokTable.pengajianId, pengajianTable.id)
      )
      .where(eq(pengajianTable.kelompokId, kelompokId));

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function createAbsensiJamaah(
  pengajianId: number,
  kelompokId: number,
  data: TAbsensiJamaahCreate
) {
  try {
    const jamaah = await db.query.jamaahTable.findFirst({
      where: eq(jamaahTable.id, data.jamaahId),
    });

    if (jamaah?.kelompokId !== kelompokId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada jamaah di kelompok ini",
      });
    }

    return await db.insert(absensiJamaahKelompokTable).values({
      ...data,
      pengajianId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Jamaah", error);
    throw InternalError;
  }
}

export async function updateAbsensiJamaah(
  id: number,
  pengajianId: number,
  kelompokId: number,
  data: TAbsensiJamaahCreate
) {
  try {
    const jamaah = await db.query.jamaahTable.findFirst({
      where: eq(jamaahTable.id, data.jamaahId),
    });

    if (jamaah?.kelompokId !== kelompokId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada jamaah di kelompok ini",
      });
    }

    return await db
      .update(absensiJamaahKelompokTable)
      .set(data)
      .where(
        and(
          eq(absensiJamaahKelompokTable.id, id),
          eq(absensiJamaahKelompokTable.pengajianId, pengajianId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Jamaah", error);
    throw InternalError;
  }
}
export async function deleteAbsensiJamaah(id: number[], pengajianId: number) {
  try {
    return await db
      .delete(absensiJamaahKelompokTable)
      .where(
        and(
          inArray(absensiJamaahKelompokTable.id, id),
          eq(absensiJamaahKelompokTable.pengajianId, pengajianId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Jamaah", error);
    throw InternalError;
  }
}
