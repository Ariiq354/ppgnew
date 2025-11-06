import { getCountJamaahService } from "../jamaah";
import {
  getAllPengajianOptionsService,
  getCountPengajianService,
  getPengajianByIdService,
} from "../pengajian";
import type { TAbsensiJamaahCreate } from "./absensi-jamaah.dto";
import {
  createAbsensiJamaah,
  deleteAbsensiJamaah,
  getAbsensiJamaahByPengajianId,
  getAllJamaahAbsensi,
  getCountAbsensiJamaah,
  updateAbsensiJamaah,
} from "./absensi-jamaah.repo";

export async function getAllJamaahAbsensiService(
  kelompokId: number,
  query: TSearchPagination
) {
  return await getAllJamaahAbsensi(kelompokId, query);
}

export async function getAbsensiJamaahMonitoringService(
  kelompokId: number,
  query: TSearchPagination
) {
  const data = await getAllJamaahAbsensiService(kelompokId, query);
  const pengajian = await getAllPengajianOptionsService(kelompokId);

  data.data = data.data.map((i) => {
    const total = pengajian.data.length;
    return {
      ...i,
      tanpaKeterangan: total - i.hadir - i.izin,
      kehadiran: total > 0 ? ((i.hadir + i.izin) * 100) / total : 0,
    };
  });

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: data.data,
    metadata,
  };
}

export async function getAbsensiJamaahMonitoringSummaryService(
  kelompokId: number
) {
  const countJamaah = await getCountJamaahService(kelompokId!);
  const countPengajian = await getCountPengajianService(kelompokId!);
  const countAbsensi = await getCountAbsensiJamaah(kelompokId!);

  const denominator = countJamaah * countPengajian;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countJamaah,
    kehadiran,
  };

  return data;
}

export async function getAbsensiJamaahByPengajianIdService(
  kelompokId: number,
  pengajianId: number
) {
  const check = await getPengajianByIdService(pengajianId);
  if (check.data?.kelompokId !== kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  const data = await getAbsensiJamaahByPengajianId(kelompokId, pengajianId);

  return data;
}

export async function createAbsensiJamaahService(
  kelompokId: number,
  pengajianId: number,
  query: TAbsensiJamaahCreate[]
) {
  const check = await getPengajianByIdService(pengajianId);
  if (check.data?.kelompokId !== kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiJamaah([item.id], pengajianId);
      } else {
        updateAbsensiJamaah(item.id, pengajianId, kelompokId, item);
      }
    } else {
      await createAbsensiJamaah(pengajianId, kelompokId, item);
    }
  }
}
