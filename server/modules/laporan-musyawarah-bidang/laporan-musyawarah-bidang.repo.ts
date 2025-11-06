import { and, eq, inArray, type SQL } from "drizzle-orm";
import type {
  TLaporanMusyawarahCreate,
  TLaporanMusyawarahList,
} from "../laporan-musyawarah";
import { db } from "~~/server/database";
import {
  laporanMusyawarahBidangTable,
  musyawarahBidangTable,
} from "~~/server/database/schema/bidang";
import type { roles } from "~~/shared/permission";

export async function getMusyawarahBidangByid(
  musyawarahId: number,
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  return await tryCatch(
    "Failed to find musyawarah bidang by daerah",
    db.query.musyawarahBidangTable.findFirst({
      where: and(
        eq(musyawarahBidangTable.id, musyawarahId),
        eq(musyawarahBidangTable.daerahId, daerahId),
        eq(musyawarahBidangTable.bidang, bidang)
      ),
    })
  );
}

export async function getLaporanMusyawarahBidang(
  daerahId: number,
  query: TLaporanMusyawarahList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(laporanMusyawarahBidangTable.musyawarahId, query.musyawarahId),
    eq(musyawarahBidangTable.daerahId, daerahId),
    eq(musyawarahBidangTable.bidang, query.bidang),
  ];

  const data = await tryCatch(
    "Failed to get Laporan Musyawarah Bidang",
    db
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
      .where(and(...conditions))
  );

  return data;
}

export async function createLaporanMusyawarahBidang(
  data: TLaporanMusyawarahCreate
) {
  return await tryCatch(
    "Failed to create Laporan Musyawarah Bidang",
    db.insert(laporanMusyawarahBidangTable).values(data)
  );
}

export async function deleteLaporanMusyawarahBidang(
  id: number[],
  musyawarahId: number
) {
  return await tryCatch(
    "Failed to delete Laporan Musyawarah bidang",
    db
      .delete(laporanMusyawarahBidangTable)
      .where(
        and(
          inArray(laporanMusyawarahBidangTable.id, id),
          eq(laporanMusyawarahBidangTable.musyawarahId, musyawarahId)
        )
      )
  );
}
