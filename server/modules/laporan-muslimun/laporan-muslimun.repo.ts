import { and, eq, inArray, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  laporanMusyawarahMuslimunTable,
  musyawarahMuslimunTable,
} from "~~/server/database/schema/kelompok";
import type {
  TLaporanMuslimunCreate,
  TLaporanMuslimunList,
} from "./laporan-muslimun.dto";

export async function findMuslimunByKelompok(
  musyawarahId: number,
  kelompokId: number
) {
  return await tryCatch(
    "Failed to check Musyawarah Muslimun existence",
    db.query.musyawarahMuslimunTable.findFirst({
      where: and(
        eq(musyawarahMuslimunTable.id, musyawarahId),
        eq(musyawarahMuslimunTable.kelompokId, kelompokId)
      ),
    })
  );
}

export async function getLaporanMuslimunByMusyawarahId(
  kelompokId: number,
  query: TLaporanMuslimunList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(laporanMusyawarahMuslimunTable.musyawarahId, query.musyawarahId),
    eq(musyawarahMuslimunTable.kelompokId, kelompokId),
  ];

  const data = await tryCatch(
    "Failed to get Laporan Muslimun",
    db
      .select({
        id: laporanMusyawarahMuslimunTable.id,
        musyawarahId: laporanMusyawarahMuslimunTable.musyawarahId,
        laporan: laporanMusyawarahMuslimunTable.laporan,
        keterangan: laporanMusyawarahMuslimunTable.keterangan,
      })
      .from(laporanMusyawarahMuslimunTable)
      .leftJoin(
        musyawarahMuslimunTable,
        eq(
          laporanMusyawarahMuslimunTable.musyawarahId,
          musyawarahMuslimunTable.id
        )
      )
      .where(and(...conditions))
  );

  return {
    data,
  };
}

export async function createLaporanMuslimun(data: TLaporanMuslimunCreate) {
  return await tryCatch(
    "Failed to create Laporan Muslimun",
    db.insert(laporanMusyawarahMuslimunTable).values(data)
  );
}

export async function deleteLaporanMuslimun(
  id: number[],
  musyawarahId: number
) {
  return await tryCatch(
    "Failed to delete Laporan Muslimun",
    db
      .delete(laporanMusyawarahMuslimunTable)
      .where(
        and(
          inArray(laporanMusyawarahMuslimunTable.id, id),
          eq(laporanMusyawarahMuslimunTable.musyawarahId, musyawarahId)
        )
      )
  );
}
