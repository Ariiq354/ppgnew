import type {
  TLaporanMuslimunCreate,
  TLaporanMuslimunDelete,
  TLaporanMuslimunList,
} from "./laporan-muslimun.dto";
import {
  createLaporanMuslimun,
  deleteLaporanMuslimun,
  getLaporanMuslimun,
  getLaporanMuslimunSummary,
  getMuslimunByKelompokId,
} from "./laporan-muslimun.repo";

export async function getLaporanMuslimunService(
  desaId: number,
  query: TLaporanMuslimunList
) {
  return await getLaporanMuslimun(desaId, query);
}

export async function getLaporanMuslimunSummaryService(
  desaId: number,
  tahun: number,
  bulan: string
) {
  const data = await getLaporanMuslimunSummary(desaId, tahun, bulan);

  const grouped = data.reduce(
    (acc, item) => {
      if (!acc[item.kelompokName!]) {
        acc[item.kelompokName!] = [];
      }
      acc[item.kelompokName!]!.push({
        laporan: item.laporan,
        keterangan: item.keterangan,
      });
      return acc;
    },
    {} as Record<string, { laporan: string; keterangan: string }[]>
  );

  return grouped;
}

export async function createLaporanMuslimunService(
  kelompokId: number,
  body: TLaporanMuslimunCreate
) {
  const exist = await getMuslimunByKelompokId(body.musyawarahId, kelompokId);

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await createLaporanMuslimun(body);
}

export async function deleteLaporanMuslimunService(
  kelompokId: number,
  body: TLaporanMuslimunDelete
) {
  const exist = await getMuslimunByKelompokId(body.musyawarahId, kelompokId);

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await deleteLaporanMuslimun(body.id, body.musyawarahId);
}
