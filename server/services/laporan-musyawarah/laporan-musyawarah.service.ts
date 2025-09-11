import { and, eq, inArray, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  laporanMusyawarahTable,
  musyawarahTable,
} from "~~/server/database/schema/pengurus";
import type { roles } from "~~/shared/permission";
import type {
  TLaporanMusyawarahCreate,
  TLaporanMusyawarahList,
} from "./dto/laporan-musyawarah.dto";

export async function getLaporanMusyawarahByMusyawarahId(
  daerahId: number,
  query: TLaporanMusyawarahList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(laporanMusyawarahTable.musyawarahId, query.musyawarahId),
    eq(musyawarahTable.daerahId, daerahId),
  ];

  if (query.bidang) {
    conditions.push(eq(laporanMusyawarahTable.bidang, query.bidang));
  }

  try {
    const data = await db
      .select({
        id: laporanMusyawarahTable.id,
        musyawarahId: laporanMusyawarahTable.musyawarahId,
        bidang: laporanMusyawarahTable.bidang,
        laporan: laporanMusyawarahTable.laporan,
        keterangan: laporanMusyawarahTable.keterangan,
      })
      .from(laporanMusyawarahTable)
      .leftJoin(
        musyawarahTable,
        eq(laporanMusyawarahTable.musyawarahId, musyawarahTable.id)
      )
      .where(and(...conditions));

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Laporan Musyawarah", error);
    throw InternalError;
  }
}

export async function createLaporanMusyawarah(
  daerahId: number,
  data: TLaporanMusyawarahCreate
) {
  try {
    const exist = await db.query.musyawarahTable.findFirst({
      where: and(
        eq(musyawarahTable.id, data.musyawarahId),
        eq(musyawarahTable.daerahId, daerahId)
      ),
    });

    if (!exist) {
      throw createError({
        status: 403,
        message: "Musyawarah tidak ada di daerah ini",
      });
    }

    return await db.insert(laporanMusyawarahTable).values({
      ...data,
    });
  } catch (error) {
    console.error("Failed to create Laporan Musyawarah", error);
    throw InternalError;
  }
}

export async function deleteLaporanMusyawarah(
  id: number[],
  musyawarahId: number,
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  try {
    const exist = await db.query.musyawarahTable.findFirst({
      where: and(
        eq(musyawarahTable.id, musyawarahId),
        eq(musyawarahTable.daerahId, daerahId)
      ),
    });

    if (!exist) {
      throw createError({
        status: 403,
        message: "Musyawarah tidak ada di daerah ini",
      });
    }

    return await db
      .delete(laporanMusyawarahTable)
      .where(
        and(
          inArray(laporanMusyawarahTable.id, id),
          eq(laporanMusyawarahTable.musyawarahId, musyawarahId),
          eq(laporanMusyawarahTable.bidang, bidang)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Pengurus", error);
    throw InternalError;
  }
}
