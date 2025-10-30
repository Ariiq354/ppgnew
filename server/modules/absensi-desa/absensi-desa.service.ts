import {
  getAllGenerusSummaryService,
  getCountAbsensiGenerusService,
  getCountGenerusAbsensiService,
  type TAbsensiKelasPengajianKelompokList,
  type TGenerusAbsensiKelompokList,
} from "../absensi-generus";
import {
  getAllKelasDesaOptionsService,
  getCountKelasDesaService,
  getKelasDesaByIdService,
} from "../kelas-desa";
import {
  getAllKelasOptionsService,
  getCountKelasService,
} from "../kelas-kelompok";
import { getKelompokByDesaIdService } from "../kelompok";
import type { TGenerusDesaAbsensiList } from "./absensi-desa.dto";
import {
  createAbsensiGenerusDesa,
  deleteAbsensiGenerusDesa,
  getAbsensiGenerusByDesaId,
  getAbsensiGenerusDesaByKelasId,
  getAllGenerusDesaExclude,
  getAllGenerusDesaSummary,
  getCountAbsensiGenerusDesa,
  getCountGenerusDesaAbsensi,
  getGenerusDesaAbsensiExclude,
  updateAbsensiGenerusDesa,
} from "./absensi-desa.repo";

export async function getAbsensiDesaKelompokService(
  desaId: number,
  query: TGenerusAbsensiKelompokList
) {
  const desa = await getKelompokByDesaIdService(desaId);
  if (!desa.find((i) => i.id === query.kelompokId)) {
    throw createError({
      statusCode: 403,
      message: "There is no kelompok in your deaa",
    });
  }

  const data = await getAllGenerusSummaryService(query.kelompokId, query);
  const kelas = await getAllKelasOptionsService(query.kelompokId, {
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

export async function getAbsensiDesaKelompokSummaryService(
  desaId: number,
  query: TAbsensiKelasPengajianKelompokList
) {
  const desa = await getKelompokByDesaIdService(desaId!);
  if (!desa.find((i) => i.id === query.kelompokId)) {
    throw createError({
      statusCode: 403,
      message: "There is no kelompok in your deaa",
    });
  }

  const countGenerus = await getCountGenerusAbsensiService(
    query.kelompokId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasService(
    query.kelompokId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerusService(
    query.kelompokId,
    query.kelasPengajian
  );

  const denominator = countGenerus * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countGenerus,
    kehadiran,
  };

  return data;
}

export async function getAbsensiDesaMonitoringService(
  desaId: number,
  query: TGenerusDesaAbsensiList
) {
  const data = await getAllGenerusDesaSummary(desaId, query);
  const kelas = await getAllKelasDesaOptionsService(desaId, {
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

export async function getGenerusDesaAbsensiExcludeService(desaId: number) {
  return getGenerusDesaAbsensiExclude(desaId);
}

export async function getAbsensiDesaMonitoringSummaryService(
  desaId: number,
  query: TAbsensiKelasPengajianList
) {
  const countGenerus = await getCountGenerusDesaAbsensi(
    desaId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasDesaService(
    desaId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerusDesa(
    desaId,
    query.kelasPengajian
  );

  const denominator = countGenerus * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countGenerus,
    kehadiran,
  };

  return data;
}

export async function getAbsensiGenerusDesaByKelasIdService(
  desaId: number,
  kelasId: number
) {
  const check = await getKelasDesaByIdService(kelasId);
  if (check.data?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  return await getAbsensiGenerusDesaByKelasId(
    desaId!,
    kelasId,
    check.data.nama
  );
}

export async function getAllGenerusDesaExcludeService(
  desaId: number,
  query: TGenerusDesaAbsensiList
) {
  const { data, total } = await getAllGenerusDesaExclude(desaId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: total,
    totalPage: Math.ceil(total / query.limit),
  };

  return {
    data,
    metadata,
  };
}

export async function createAbsensiDesaService(
  desaId: number,
  kelasId: number,
  query: TAbsensiGenerusCreate[]
) {
  const check = await getKelasDesaByIdService(kelasId);
  if (check.data?.desaId !== desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  for (const item of query) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiGenerusDesa([item.id], kelasId);
      } else {
        updateAbsensiGenerusDesa(
          item.id,
          kelasId,
          desaId,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiGenerusDesa(kelasId, desaId, check.data!.nama, item);
    }
  }
}

export async function getAllGenerusDesaSummaryService(
  desaId: number,
  query: TGenerusDesaAbsensiList
) {
  return getAllGenerusDesaSummary(desaId, query);
}

export async function getCountGenerusDesaAbsensiService(
  desaId: number,
  kelasPengajian: string
) {
  return getCountGenerusDesaAbsensi(desaId, kelasPengajian);
}

export async function getCountAbsensiGenerusDesaService(
  desaId: number,
  kelasPengajian: string
) {
  return getCountAbsensiGenerusDesa(desaId, kelasPengajian);
}

export async function getAbsensiGenerusByDesaIdService(desaId: number) {
  return getAbsensiGenerusByDesaId(desaId);
}
