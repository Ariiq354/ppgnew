import {
  getAllMusyawarahOptionsService,
  getCountMusyawarahService,
  getMusyawarahByIdService,
} from "../musyawarah";
import {
  getAllPengurusAbsensiService,
  getCountPengurusService,
} from "../pengurus";
import type { TAbsensiPengurusCreate } from "./absensi-pengurus.dto";
import {
  createAbsensiPengurus,
  deleteAbsensiPengurus,
  getAbsensiPengurusByMusyawarahId,
  getCountAbsensiPengurus,
  updateAbsensiPengurus,
} from "./absensi-pengurus.repo";

export async function getAbsensiPengurusMonitoringService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllPengurusAbsensiService(daerahId, query);
  const musyawarah = await getAllMusyawarahOptionsService(daerahId);

  data.data = data.data.map((i) => {
    const total = musyawarah.data.length;
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
    data,
    metadata,
  };
}

export async function getAbsensiPengurusMonitoringSummaryService(
  daerahId: number
) {
  const countPengurus = await getCountPengurusService(daerahId);
  const countMusyawarah = await getCountMusyawarahService(daerahId);
  const countAbsensi = await getCountAbsensiPengurus(daerahId);

  const denominator = countPengurus * countMusyawarah;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countPengurus,
    kehadiran,
  };

  return data;
}

export async function getAbsensiPengurusByMusyawarahIdService(
  daerahId: number,
  musyawarahId: number
) {
  const check = await getMusyawarahByIdService(musyawarahId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  const data = await getAbsensiPengurusByMusyawarahId(daerahId, musyawarahId);

  return data;
}

export async function createAbsensiPengurusService(
  daerahId: number,
  musyawarahId: number,
  query: TAbsensiPengurusCreate[]
) {
  const check = await getMusyawarahByIdService(musyawarahId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiPengurus([item.id], musyawarahId);
      } else {
        updateAbsensiPengurus(item.id, musyawarahId, item);
      }
    } else {
      await createAbsensiPengurus(musyawarahId, item);
    }
  }
}
