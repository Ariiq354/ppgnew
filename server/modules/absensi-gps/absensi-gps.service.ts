import {
  getAllKelasGpsOptionsService,
  getCountKelasGpsService,
  getKelasGpsByIdService,
} from "../kelas-gps";
import {
  createAbsensiGps,
  deleteAbsensiGps,
  getAbsensiGpsByKelasId,
  getAllGpsExclude,
  getAllGpsSummary,
  getCountAbsensiGps,
  getCountGpsAbsensi,
  updateAbsensiGps,
} from "./absensi-gps.repo";

export async function getAbsensiGpsMonitoringService(
  desaId: number,
  query: TSearchPagination
) {
  const data = await getAllGpsSummary(desaId, query);
  const kelas = await getAllKelasGpsOptionsService(desaId);

  data.data = data.data.map((i) => {
    const total = kelas.data.length;
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

export async function getAbsensiGpsMonitoringSummaryService(desaId: number) {
  const countGenerus = await getCountGpsAbsensi(desaId);
  const countKelas = await getCountKelasGpsService(desaId);
  const countAbsensi = await getCountAbsensiGps(desaId);

  const denominator = countGenerus * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countGenerus,
    kehadiran,
  };

  return data;
}

export async function getAbsensiGpsByKelasIdService(
  desaId: number,
  kelasId: number
) {
  const check = await getKelasGpsByIdService(kelasId);
  if (check.data?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  const data = await getAbsensiGpsByKelasId(desaId, kelasId);

  return data;
}

export async function getAllGpsExcludeService(
  desaId: number,
  query: TSearchPagination
) {
  const data = await getAllGpsExclude(desaId, query);

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

export async function createAbsensiGpsService(
  desaId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasGpsByIdService(kelasId);
  if (check.data?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiGps([item.id], kelasId);
      } else {
        updateAbsensiGps(item.id, kelasId, desaId!, item);
      }
    } else {
      await createAbsensiGps(kelasId, desaId!, item);
    }
  }
}
