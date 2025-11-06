import { getDesaByDaerahIdService } from "../desa";
import { getCountGenerusExcludeService } from "../generus";
import { getCountKelasService, getKelasByIdService } from "../kelas-kelompok";
import {
  getKelompokByDaerahIdService,
  getKelompokByDesaIdService,
} from "../kelompok";
import type {
  TAbsensiKelasPengajianForDaerahList,
  TAbsensiKelasPengajianForDesaList,
  TGenerusAbsensiForDaerahList,
  TGenerusAbsensiForDesaList,
} from "./absensi-generus.dto";
import {
  createAbsensiGenerus,
  deleteAbsensiGenerus,
  getAbsensiGenerusByKelasId,
  getAbsensiGenerusByKelompokId,
  getAllGenerusSummary,
  getCountAbsensiGenerus,
  updateAbsensiGenerus,
} from "./absensi-generus.repo";

export async function getAbsensiGenerusMonitoringService(
  kelompokId: number,
  query: TGenerusAbsensiList
) {
  const data = await getAllGenerusSummary({ kelompokId }, query);
  const kelas = await getCountKelasService(
    { kelompokId },
    query.kelasPengajian
  );

  data.data = data.data.map((i) => {
    return {
      ...i,
      tanpaKeterangan: kelas - i.hadir - i.izin,
      kehadiran: kelas > 0 ? ((i.hadir + i.izin) * 100) / kelas : 0,
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
  const countGenerus = await getCountGenerusExcludeService(
    { kelompokId },
    query.kelasPengajian
  );
  const countKelas = await getCountKelasService(
    { kelompokId },
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerus(
    { kelompokId },
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

export async function getAbsensiGenerusMonitoringForDesaService(
  desaId: number,
  query: TGenerusAbsensiForDesaList
) {
  if (query.kelompokId) {
    const desa = await getKelompokByDesaIdService(desaId);
    if (!desa.find((i) => i.id === query.kelompokId)) {
      throw createError({
        statusCode: 403,
        message: "There is no kelompok in your deaa",
      });
    }
  }

  const data = await getAllGenerusSummary(
    { desaId, kelompokId: query.kelompokId },
    query
  );
  const kelas = await getCountKelasService(
    { desaId, kelompokId: query.kelompokId },
    query.kelasPengajian
  );

  data.data = data.data.map((i) => {
    return {
      ...i,
      tanpaKeterangan: kelas - i.hadir - i.izin,
      kehadiran: kelas > 0 ? ((i.hadir + i.izin) * 100) / kelas : 0,
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

export async function getAbsensiGenerusForDesaSummaryService(
  desaId: number,
  query: TAbsensiKelasPengajianForDesaList
) {
  if (query.kelompokId) {
    const desa = await getKelompokByDesaIdService(desaId);
    if (!desa.find((i) => i.id === query.kelompokId)) {
      throw createError({
        statusCode: 403,
        message: "There is no kelompok in your deaa",
      });
    }
  }

  const countGenerus = await getCountGenerusExcludeService(
    { desaId, kelompokId: query.kelompokId },
    query.kelasPengajian
  );
  const countKelas = await getCountKelasService(
    { desaId, kelompokId: query.kelompokId },
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerus(
    { desaId, kelompokId: query.kelompokId },
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

export async function getAbsensiGenerusMonitoringForDaerahService(
  daerahId: number,
  query: TGenerusAbsensiForDaerahList
) {
  if (query.desaId) {
    const desa = await getDesaByDaerahIdService(daerahId);
    if (!desa.find((i) => i.id === query.desaId)) {
      throw createError({
        statusCode: 403,
        message: "There is no desa in your daerah",
      });
    }
  }

  if (query.kelompokId) {
    const kelompok = await getKelompokByDaerahIdService(daerahId);
    if (!kelompok.find((i) => i.id === query.kelompokId)) {
      throw createError({
        statusCode: 403,
        message: "There is no kelompok in your desa",
      });
    }
  }

  const data = await getAllGenerusSummary(
    { daerahId, desaId: query.desaId, kelompokId: query.kelompokId },
    query
  );
  const kelas = await getCountKelasService(
    { daerahId, desaId: query.desaId, kelompokId: query.kelompokId },
    query.kelasPengajian
  );

  data.data = data.data.map((i) => {
    return {
      ...i,
      tanpaKeterangan: kelas - i.hadir - i.izin,
      kehadiran: kelas > 0 ? ((i.hadir + i.izin) * 100) / kelas : 0,
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

export async function getAbsensiGenerusForDaerahSummaryService(
  daerahId: number,
  query: TAbsensiKelasPengajianForDaerahList
) {
  if (query.desaId) {
    const desa = await getDesaByDaerahIdService(daerahId);
    if (!desa.find((i) => i.id === query.desaId)) {
      throw createError({
        statusCode: 403,
        message: "There is no desa in your daerah",
      });
    }
  }

  if (query.kelompokId) {
    const kelompok = await getKelompokByDaerahIdService(daerahId);
    if (!kelompok.find((i) => i.id === query.kelompokId)) {
      throw createError({
        statusCode: 403,
        message: "There is no kelompok in your daerah",
      });
    }
  }

  const countGenerus = await getCountGenerusExcludeService(
    { daerahId, desaId: query.desaId, kelompokId: query.kelompokId },
    query.kelasPengajian
  );
  const countKelas = await getCountKelasService(
    { daerahId, desaId: query.desaId, kelompokId: query.kelompokId },
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerus(
    { daerahId, desaId: query.desaId, kelompokId: query.kelompokId },
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

export async function getAbsensiGenerusByKelompokIdService(kelompokId: number) {
  return await getAbsensiGenerusByKelompokId(kelompokId);
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
