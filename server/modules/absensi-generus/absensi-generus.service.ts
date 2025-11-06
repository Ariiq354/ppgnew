import {
  getAllKelasOptionsService,
  getCountKelasService,
  getKelasByIdService,
} from "../kelas-kelompok";
import { getKelompokByDesaIdService } from "../kelompok";
import type {
  TAbsensiKelasPengajianKelompokList,
  TGenerusAbsensiKelompokList,
} from "./absensi-generus.dto";
import {
  createAbsensiGenerus,
  deleteAbsensiGenerus,
  getAbsensiGenerusByKelasId,
  getAbsensiGenerusByKelompokId,
  getAllGenerusExclude,
  getAllGenerusSummary,
  getCountAbsensiGenerus,
  getCountGenerusAbsensi,
  getGenerusAbsensiExclude,
  updateAbsensiGenerus,
} from "./absensi-generus.repo";

export async function getAbsensiGenerusMonitoringService(
  kelompokId: number,
  query: TGenerusAbsensiList
) {
  const data = await getAllGenerusSummary(kelompokId, query);
  const kelas = await getAllKelasOptionsService(kelompokId, {
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

export async function getAbsensiGenerusSummaryService(
  kelompokId: number,
  query: TAbsensiKelasPengajianList
) {
  const countGenerus = await getCountGenerusAbsensi(
    kelompokId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasService(
    kelompokId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerus(
    kelompokId,
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

export async function getAbsensiGenerusUntukDesaMonitoringService(
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

  const data = await getAllGenerusSummary(query.kelompokId, query);
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

export async function getAbsensiGenerusUntukDesaSummaryService(
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

export async function getAllGenerusExcludeService(
  kelompokId: number,
  query: TGenerusAbsensiList
) {
  const data = await getAllGenerusExclude(kelompokId, query);

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

export async function getGenerusAbsensiExcludeService(kelompokId: number) {
  return getGenerusAbsensiExclude(kelompokId);
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

export async function getCountGenerusAbsensiService(
  kelompokId: number,
  kelasPengajian: string
) {
  return await getCountGenerusAbsensi(kelompokId, kelasPengajian);
}

export async function getCountAbsensiGenerusService(
  kelompokId: number,
  kelasPengajian: string
) {
  return await getCountAbsensiGenerus(kelompokId, kelasPengajian);
}

export async function getAbsensiGenerusByKelompokIdService(kelompokId: number) {
  return await getAbsensiGenerusByKelompokId(kelompokId);
}
