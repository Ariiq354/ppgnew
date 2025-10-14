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
  const data = await tryCatch(
    "Failed to get Absensi Jamaah",
    db
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
      )
  );

  return {
    data,
  };
}

export async function getCountAbsensiJamaah(kelompokId: number) {
  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        count: count(),
      })
      .from(absensiJamaahKelompokTable)
      .leftJoin(
        pengajianTable,
        eq(absensiJamaahKelompokTable.pengajianId, pengajianTable.id)
      )
      .where(eq(pengajianTable.kelompokId, kelompokId))
  );

  return data!.count;
}

export async function createAbsensiJamaah(
  pengajianId: number,
  kelompokId: number,
  data: TAbsensiJamaahCreate
) {
  const jamaah = await tryCatch(
    "Failed to find Jamaah for Absensi creation",
    db.query.jamaahTable.findFirst({
      where: eq(jamaahTable.id, data.jamaahId),
    })
  );

  if (jamaah?.kelompokId !== kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Tidak ada jamaah di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to create Absensi Jamaah",
    db.insert(absensiJamaahKelompokTable).values({
      ...data,
      pengajianId,
    })
  );
}

export async function updateAbsensiJamaah(
  id: number,
  pengajianId: number,
  kelompokId: number,
  data: TAbsensiJamaahCreate
) {
  const jamaah = await tryCatch(
    "Failed to find Jamaah for Absensi update",
    db.query.jamaahTable.findFirst({
      where: eq(jamaahTable.id, data.jamaahId),
    })
  );

  if (jamaah?.kelompokId !== kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Tidak ada jamaah di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to Update Absensi Jamaah",
    db
      .update(absensiJamaahKelompokTable)
      .set(data)
      .where(
        and(
          eq(absensiJamaahKelompokTable.id, id),
          eq(absensiJamaahKelompokTable.pengajianId, pengajianId)
        )
      )
  );
}
export async function deleteAbsensiJamaah(id: number[], pengajianId: number) {
  return await tryCatch(
    "Failed to delete Absensi Jamaah",
    db
      .delete(absensiJamaahKelompokTable)
      .where(
        and(
          inArray(absensiJamaahKelompokTable.id, id),
          eq(absensiJamaahKelompokTable.pengajianId, pengajianId)
        )
      )
  );
}
