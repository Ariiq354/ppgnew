import {
  getAllKelasTahfidzOptionsService,
  getCountKelasTahfidzService,
  getKelasTahfidzByIdService,
} from "../kelas-tahfidz";
import {
  createAbsensiTahfidz,
  deleteAbsensiTahfidz,
  getAbsensiTahfidzByDaerahId,
  getAbsensiTahfidzByKelasId,
  getAllTahfidzExclude,
  getAllTahfidzSummary,
  getCountAbsensiTahfidz,
  getCountTahfidzAbsensi,
  getGenerusTahfidzAbsensiExclude,
  updateAbsensiTahfidz,
} from "./absensi-tahfidz.repo";

export async function getAbsensiTahfidzMonitoringService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllTahfidzSummary(daerahId, query);
  const kelas = await getAllKelasTahfidzOptionsService(daerahId);

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

export async function getAbsensiTahfidzMonitoringSummaryService(
  daerahId: number
) {
  const countGenerus = await getCountTahfidzAbsensi(daerahId);
  const countKelas = await getCountKelasTahfidzService(daerahId);
  const countAbsensi = await getCountAbsensiTahfidz(daerahId);

  const denominator = countGenerus * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countGenerus,
    kehadiran,
  };

  return data;
}

export async function getAbsensiTahfidzByKelasIdService(
  daerahId: number,
  kelasId: number
) {
  const check = await getKelasTahfidzByIdService(kelasId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  const data = await getAbsensiTahfidzByKelasId(daerahId, kelasId);

  return data;
}

export async function getAllTahfidzExcludeService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllTahfidzExclude(daerahId, query);

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

export async function createAbsensiTahfidzService(
  daerahId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasTahfidzByIdService(kelasId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiTahfidz([item.id], kelasId);
      } else {
        updateAbsensiTahfidz(item.id, kelasId, daerahId!, item);
      }
    } else {
      await createAbsensiTahfidz(kelasId, daerahId!, item);
    }
  }
}

export async function getAbsensiTahfidzByDaerahIdService(daerahId: number) {
  return getAbsensiTahfidzByDaerahId(daerahId);
}

export async function getGenerusTahfidzAbsensiExcludeService(daerahId: number) {
  return getGenerusTahfidzAbsensiExclude(daerahId);
}
