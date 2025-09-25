import { and, eq, inArray, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  laporanMusyawarahBidangTable,
  musyawarahBidangTable,
} from "~~/server/database/schema/bidang";
import type { roles } from "~~/shared/permission";
import type {
  TLaporanMusyawarahBidangCreate,
  TLaporanMusyawarahBidangList,
} from "./laporan-musyawarah-bidang.dto";

export async function getLaporanMusyawarahBidangByMusyawarahId(
  daerahId: number,
  query: TLaporanMusyawarahBidangList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(laporanMusyawarahBidangTable.musyawarahId, query.musyawarahId),
    eq(musyawarahBidangTable.daerahId, daerahId),
    eq(musyawarahBidangTable.bidang, query.bidang),
  ];

  try {
    const data = await db
      .select({
        id: laporanMusyawarahBidangTable.id,
        musyawarahId: laporanMusyawarahBidangTable.musyawarahId,
        laporan: laporanMusyawarahBidangTable.laporan,
        keterangan: laporanMusyawarahBidangTable.keterangan,
      })
      .from(laporanMusyawarahBidangTable)
      .leftJoin(
        musyawarahBidangTable,
        eq(laporanMusyawarahBidangTable.musyawarahId, musyawarahBidangTable.id)
      )
      .where(and(...conditions));

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Laporan Musyawarah Bidang", error);
    throw InternalError;
  }
}

export async function createLaporanMusyawarahBidang(
  daerahId: number,
  data: TLaporanMusyawarahBidangCreate
) {
  try {
    const exist = await db.query.musyawarahBidangTable.findFirst({
      where: and(
        eq(musyawarahBidangTable.id, data.musyawarahId),
        eq(musyawarahBidangTable.daerahId, daerahId),
        eq(musyawarahBidangTable.bidang, data.bidang)
      ),
    });

    if (!exist) {
      throw createError({
        status: 403,
        message: "Musyawarah tidak ada di daerah ini",
      });
    }

    return await db.insert(laporanMusyawarahBidangTable).values({
      ...data,
    });
  } catch (error) {
    console.error("Failed to create Laporan Musyawarah Bidang", error);
    throw InternalError;
  }
}

export async function deleteLaporanMusyawarahBidang(
  id: number[],
  musyawarahId: number,
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  try {
    const exist = await db.query.musyawarahBidangTable.findFirst({
      where: and(
        eq(musyawarahBidangTable.id, musyawarahId),
        eq(musyawarahBidangTable.daerahId, daerahId),
        eq(musyawarahBidangTable.bidang, bidang)
      ),
    });

    if (!exist) {
      throw createError({
        status: 403,
        message: "Musyawarah tidak ada di daerah ini",
      });
    }

    return await db
      .delete(laporanMusyawarahBidangTable)
      .where(
        and(
          inArray(laporanMusyawarahBidangTable.id, id),
          eq(laporanMusyawarahBidangTable.musyawarahId, musyawarahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Laporan Musyawarah bidang", error);
    throw InternalError;
  }
}
