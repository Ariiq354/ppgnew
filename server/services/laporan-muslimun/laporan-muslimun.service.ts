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

export async function getLaporanMuslimunByMusyawarahId(
  kelompokId: number,
  query: TLaporanMuslimunList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(laporanMusyawarahMuslimunTable.musyawarahId, query.musyawarahId),
    eq(musyawarahMuslimunTable.kelompokId, kelompokId),
  ];

  try {
    const data = await db
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
      .where(and(...conditions));

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Laporan Muslimun", error);
    throw InternalError;
  }
}

export async function createLaporanMuslimun(
  kelompokId: number,
  data: TLaporanMuslimunCreate
) {
  try {
    const exist = await db.query.musyawarahMuslimunTable.findFirst({
      where: and(
        eq(musyawarahMuslimunTable.id, data.musyawarahId),
        eq(musyawarahMuslimunTable.kelompokId, kelompokId)
      ),
    });

    if (!exist) {
      throw createError({
        status: 403,
        message: "Muslimun tidak ada di kelompok ini",
      });
    }

    return await db.insert(laporanMusyawarahMuslimunTable).values({
      ...data,
    });
  } catch (error) {
    console.error("Failed to create Laporan Muslimun", error);
    throw InternalError;
  }
}

export async function deleteLaporanMuslimun(
  id: number[],
  musyawarahId: number,
  kelompokId: number
) {
  try {
    const exist = await db.query.musyawarahMuslimunTable.findFirst({
      where: and(
        eq(musyawarahMuslimunTable.id, musyawarahId),
        eq(musyawarahMuslimunTable.kelompokId, kelompokId)
      ),
    });

    if (!exist) {
      throw createError({
        status: 403,
        message: "Muslimun tidak ada di kelompok ini",
      });
    }

    return await db
      .delete(laporanMusyawarahMuslimunTable)
      .where(
        and(
          inArray(laporanMusyawarahMuslimunTable.id, id),
          eq(laporanMusyawarahMuslimunTable.musyawarahId, musyawarahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Laporan Muslimun", error);
    throw InternalError;
  }
}
