import { getCountKeputrianByKelasPengajianService } from "../generus-keputrian";
import {
  getAllKelasKeputrianOptionsService,
  getCountKelasKeputrianService,
  getKelasKeputrianByIdService,
} from "../kelas-keputrian";
import {
  createAbsensiKeputrian,
  deleteAbsensiKeputrian,
  getAbsensiKeputrianByDaerahId,
  getAbsensiKeputrianByKelasId,
  getAllKeputrianSummary,
  getCountAbsensiKeputrian,
  updateAbsensiKeputrian,
} from "./absensi-keputrian.repo";

export async function getAbsensiKeputrianMonitoringService(
  daerahId: number,
  query: TGenerusAbsensiList
) {
  const data = await getAllKeputrianSummary(daerahId, query);
  const kelas = await getAllKelasKeputrianOptionsService(daerahId, {
    nama: query.kelasPengajian,
  });

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

export async function getAbsensiKeputrianMonitoringSummaryService(
  daerahId: number,
  query: TAbsensiKelasPengajianList
) {
  const countKeputrian = await getCountKeputrianByKelasPengajianService(
    daerahId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasKeputrianService(
    daerahId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiKeputrian(
    daerahId,
    query.kelasPengajian
  );

  const denominator = countKeputrian * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countKeputrian,
    kehadiran,
  };

  return data;
}

export async function getAbsensiKeputrianByKelasIdService(
  daerahId: number,
  kelasId: number
) {
  const check = await getKelasKeputrianByIdService(kelasId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  const data = await getAbsensiKeputrianByKelasId(
    daerahId,
    kelasId,
    check.data.nama
  );

  return data;
}

export async function createAbsensiKeputrianService(
  daerahId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasKeputrianByIdService(kelasId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiKeputrian([item.id], kelasId);
      } else {
        updateAbsensiKeputrian(
          item.id,
          kelasId,
          daerahId,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiKeputrian(kelasId, daerahId, check.data!.nama, item);
    }
  }
}

export async function getAbsensiKeputrianByDaerahIdService(daerahId: number) {
  return getAbsensiKeputrianByDaerahId(daerahId);
}
