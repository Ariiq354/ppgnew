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
} from "~~/server/api/v1/musyawarah-bidang/laporan/_dto";

export async function findMusyawarahBidangByDaerah(
  musyawarahId: number,
  daerahId: number,
  bidang: (typeof roles)[number]
) {
  return assertNoErr(
    "Failed to find musyawarah bidang by daerah",
    await to(
      db.query.musyawarahBidangTable.findFirst({
        where: and(
          eq(musyawarahBidangTable.id, musyawarahId),
          eq(musyawarahBidangTable.daerahId, daerahId),
          eq(musyawarahBidangTable.bidang, bidang)
        ),
      })
    )
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

  const data = assertNoErr(
    "Failed to get Laporan Musyawarah Bidang",
    await to(
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
          eq(
            laporanMusyawarahBidangTable.musyawarahId,
            musyawarahBidangTable.id
          )
        )
        .where(and(...conditions))
    )
  );

  return data;
}

export async function createLaporanMusyawarahBidang(
  data: TLaporanMusyawarahBidangCreate
) {
  return assertNoErr(
    "Failed to create Laporan Musyawarah Bidang",
    await to(db.insert(laporanMusyawarahBidangTable).values(data))
  );
}

export async function deleteLaporanMusyawarahBidang(
  id: number[],
  musyawarahId: number
) {
  return assertNoErr(
    "Failed to delete Laporan Musyawarah bidang",
    await to(
      db
        .delete(laporanMusyawarahBidangTable)
        .where(
          and(
            inArray(laporanMusyawarahBidangTable.id, id),
            eq(laporanMusyawarahBidangTable.musyawarahId, musyawarahId)
          )
        )
    )
  );
}
