import {
  getAllKelasMudamudiOptionsService,
  getCountKelasMudamudiService,
  getKelasMudamudiByIdService,
} from "../kelas-mudamudi";
import {
  createAbsensiMudamudi,
  deleteAbsensiMudamudi,
  getAbsensiMudamudiByKelasId,
  getAllMudamudiExclude,
  getAllMudamudiSummary,
  getCountAbsensiMudamudi,
  getCountMudamudiAbsensi,
  updateAbsensiMudamudi,
} from "./absensi-mudamudi.repo";

export async function getAbsensiMudamudiMonitoringService(
  daerahId: number,
  query: TGenerusAbsensiList
) {
  const data = await getAllMudamudiSummary(daerahId, query);
  const kelas = await getAllKelasMudamudiOptionsService(daerahId, {
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

export async function getAbsensiMudamudiMonitoringSummaryService(
  daerahId: number,
  query: TAbsensiKelasPengajianList
) {
  const countMudamudi = await getCountMudamudiAbsensi(
    daerahId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasMudamudiService(
    daerahId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiMudamudi(
    daerahId,
    query.kelasPengajian
  );

  const denominator = countMudamudi * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countMudamudi,
    kehadiran,
  };

  return data;
}

export async function getAbsensiMudamudiByKelasIdService(
  daerahId: number,
  kelasId: number
) {
  const check = await getKelasMudamudiByIdService(kelasId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  const data = await getAbsensiMudamudiByKelasId(
    daerahId,
    kelasId,
    check.data.nama
  );

  return data;
}

export async function getAllMudamudiExcludeService(
  daerahId: number,
  query: TGenerusAbsensiList
) {
  const data = await getAllMudamudiExclude(daerahId, query);

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

export async function createAbsensiMudamudiService(
  daerahId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasMudamudiByIdService(kelasId);
  if (check.data?.daerahId !== daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiMudamudi([item.id], kelasId);
      } else {
        updateAbsensiMudamudi(
          item.id,
          kelasId,
          daerahId,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiMudamudi(kelasId, daerahId, check.data!.nama, item);
    }
  }
}
