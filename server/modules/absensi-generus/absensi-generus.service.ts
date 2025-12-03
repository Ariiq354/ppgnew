import type { TAbsensiKelasPengajianGenerusList } from "~~/server/utils/dto/absensi.dto";
import { getCountGenerusExcludeService } from "../generus";
import { getCountKelasService, getKelasByIdService } from "../kelas-kelompok";
import {
  createAbsensiGenerus,
  deleteAbsensiGenerus,
  getAbsensiGenerusByKelasId,
  getAllGenerusSummary,
  getCountAbsensiGenerusPerKelompok,
  updateAbsensiGenerus,
} from "./absensi-generus.repo";

export async function getAbsensiGenerusMonitoringService(
  params: {
    daerahId?: number;
    desaId?: number;
    kelompokId?: number;
  },
  query: TGenerusAbsensiList
) {
  const data = await getAllGenerusSummary(params, query);
  const kelas = await getCountKelasService({
    ...params,
    ...query,
  });

  data.data = data.data.map((i) => {
    const kelasCount =
      kelas.find((j) => j.kelompokId === i.kelompokId)?.count ?? 0;

    return {
      ...i,
      tanpaKeterangan: kelasCount - i.hadir - i.izin,
      kehadiran:
        kelasCount > 0
          ? (((i.hadir + i.izin) * 100) / kelasCount).toFixed(2)
          : 0,
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

export async function getAbsensiGenerusSummaryService(
  params: {
    daerahId?: number;
    desaId?: number;
    kelompokId?: number;
  },
  query: TAbsensiKelasPengajianGenerusList
) {
  const countGenerus = await getCountGenerusExcludeService(
    params,
    query.kelasPengajian
  );

  const countKelas = await getCountKelasService({ ...params, ...query });
  const countAbsensi = await getCountAbsensiGenerusPerKelompok({
    ...params,
    ...query,
  });

  const percentage: number[] = [];

  for (const item of countKelas) {
    const countg =
      countGenerus.find((i) => i.kelompokId === item.kelompokId)?.count ?? 0;
    const counta =
      countAbsensi.find((i) => i.kelompokId === item.kelompokId)?.count ?? 0;

    const denominator = countg * item.count;
    const kehadiran =
      denominator > 0 ? Math.round((counta * 100) / denominator) : 0;

    if (kehadiran !== 0) percentage.push(kehadiran);
  }

  const data = {
    countGenerus: countGenerus.reduce((a, i) => (a += i.count), 0),
    kehadiran:
      percentage.length > 0
        ? Math.round(
            percentage.reduce((sum, p) => sum + p, 0) / percentage.length
          )
        : 0,
  };

  return data;
}

export async function getAbsensiGenerusByKelasIdService(
  kelompokId: number,
  kelasId: number
) {
  const check = await getKelasByIdService(kelasId);
  if (check.data?.kelompokId !== kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  return await getAbsensiGenerusByKelasId(
    kelompokId,
    kelasId,
    check.data.nama!
  );
}

export async function createAbsensiGenerusService(
  kelompokId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasByIdService(kelasId);
  if (check.data?.kelompokId !== kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiGenerus([item.id], kelasId);
      } else {
        updateAbsensiGenerus(
          item.id,
          kelasId,
          kelompokId,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiGenerus(kelasId, kelompokId, check.data!.nama, item);
    }
  }
}
