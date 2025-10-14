import { and, eq, inArray, type SQL } from "drizzle-orm";
import type {
  TLaporanMusyawarahCreate,
  TLaporanMusyawarahList,
} from "./laporan-musyawarah.dto";
import { db } from "~~/server/database";
import {
  laporanMusyawarahTable,
  musyawarahTable,
} from "~~/server/database/schema/pengurus";
import type { roles } from "~~/shared/permission";

export async function findMusyawarahByDaerah(
  musyawarahId: number,
  daerahId: number
) {
  return await tryCatch(
    "Failed to find musyawarah by daerah",
    db.query.musyawarahTable.findFirst({
      where: and(
        eq(musyawarahTable.id, musyawarahId),
        eq(musyawarahTable.daerahId, daerahId)
      ),
    })
  );
}

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

  const data = await tryCatch(
    "Failed to get Laporan Musyawarah",
    db
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
      .where(and(...conditions))
  );

  return data;
}

export async function createLaporanMusyawarah(data: TLaporanMusyawarahCreate) {
  return await tryCatch(
    "Failed to create Laporan Musyawarah",
    db.insert(laporanMusyawarahTable).values({ ...data })
  );
}

export async function deleteLaporanMusyawarah(
  id: number[],
  musyawarahId: number,
  bidang: (typeof roles)[number]
) {
  return await tryCatch(
    "Failed to delete Laporan Musyawarah",
    db
      .delete(laporanMusyawarahTable)
      .where(
        and(
          inArray(laporanMusyawarahTable.id, id),
          eq(laporanMusyawarahTable.musyawarahId, musyawarahId),
          eq(laporanMusyawarahTable.bidang, bidang)
        )
      )
  );
}
