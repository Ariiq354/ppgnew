import { getCountGenerusTahfidzExcludeService } from "../generus-tahfidz";
import {
  getAllKelasTahfidzOptionsService,
  getCountKelasTahfidzService,
  getKelasTahfidzByIdService,
} from "../kelas-tahfidz";
import {
  createAbsensiTahfidz,
  deleteAbsensiTahfidz,
  getAbsensiTahfidzByKelasId,
  getAllTahfidzSummary,
  getCountAbsensiTahfidz,
  updateAbsensiTahfidz,
} from "./absensi-tahfidz.repo";

export async function getAbsensiTahfidzMonitoringService(
  desaId: number,
  query: TSearchPagination
) {
  const data = await getAllTahfidzSummary(desaId, query);
  const kelas = await getAllKelasTahfidzOptionsService(desaId);

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
  desaId: number
) {
  const countGenerus = await getCountGenerusTahfidzExcludeService(desaId);
  const countKelas = await getCountKelasTahfidzService(desaId);
  const countAbsensi = await getCountAbsensiTahfidz(desaId);

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
  desaId: number,
  kelasId: number
) {
  const check = await getKelasTahfidzByIdService(kelasId);
  if (check.data?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  const data = await getAbsensiTahfidzByKelasId(desaId, kelasId);

  return data;
}

export async function getCountAbsensiTahfidzService(desaId: number) {
  return getCountAbsensiTahfidz(desaId);
}

export async function createAbsensiTahfidzService(
  desaId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasTahfidzByIdService(kelasId);
  if (check.data?.desaId !== desaId) {
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
        updateAbsensiTahfidz(item.id, kelasId, desaId!, item);
      }
    } else {
      await createAbsensiTahfidz(kelasId, desaId!, item);
    }
  }
}
