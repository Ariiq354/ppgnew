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
} from "~~/server/api/v1/musyawarah/laporan/_dto";

export async function findMusyawarahByDaerah(
  musyawarahId: number,
  daerahId: number
) {
  return assertNoErr(
    "Failed to find musyawarah by daerah",
    await to(
      db.query.musyawarahTable.findFirst({
        where: and(
          eq(musyawarahTable.id, musyawarahId),
          eq(musyawarahTable.daerahId, daerahId)
        ),
      })
    )
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

  const data = assertNoErr(
    "Failed to get Laporan Musyawarah",
    await to(
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
    )
  );

  return data;
}

export async function createLaporanMusyawarah(data: TLaporanMusyawarahCreate) {
  return assertNoErr(
    "Failed to create Laporan Musyawarah",
    await to(db.insert(laporanMusyawarahTable).values({ ...data }))
  );
}

export async function deleteLaporanMusyawarah(
  id: number[],
  musyawarahId: number,
  bidang: (typeof roles)[number]
) {
  return assertNoErr(
    "Failed to delete Laporan Musyawarah",
    await to(
      db
        .delete(laporanMusyawarahTable)
        .where(
          and(
            inArray(laporanMusyawarahTable.id, id),
            eq(laporanMusyawarahTable.musyawarahId, musyawarahId),
            eq(laporanMusyawarahTable.bidang, bidang)
          )
        )
    )
  );
}
