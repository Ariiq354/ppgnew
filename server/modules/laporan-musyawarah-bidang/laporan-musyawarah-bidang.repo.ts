import { and, eq, inArray, type SQL } from "drizzle-orm";
import type {
  TLaporanMusyawarahBidangCreate,
  TLaporanMusyawarahBidangList,
} from "./laporan-musyawarah-bidang.dto";
import { db } from "~~/server/database";
import {
  laporanMusyawarahBidangTable,
  musyawarahBidangTable,
} from "~~/server/database/schema/bidang";
import type { roles } from "~~/shared/permission";

export async function findMusyawarahBidangByDaerah(
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

export async function getLaporanMusyawarahBidangByMusyawarahId(
  daerahId: number,
  query: TLaporanMusyawarahBidangList
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
  data: TLaporanMusyawarahBidangCreate
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
