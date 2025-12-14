import type { TAbsensiKelasPengajianGenerusList } from "~~/server/utils/dto/absensi.dto";
import { getDesaByDaerahIdService } from "../desa";
import {
  getCountKelasDesaService,
  getKelasDesaByIdService,
} from "../kelas-desa";
import type {
  TAbsensiKelasDesaPengajianForDaerahList,
  TGenerusDesaAbsensiList,
  TGenerusDesaAbsensiListForDaerah,
} from "./absensi-desa.dto";
import {
  createAbsensiGenerusDesa,
  deleteAbsensiGenerusDesa,
  getAbsensiGenerusByDesaId,
  getAbsensiGenerusDesaByKelasId,
  getAllGenerusDesaSummary,
  getCountAbsensiGenerusDesa,
  updateAbsensiGenerusDesa,
} from "./absensi-desa.repo";
import { getCountGenerusExcludeService } from "../generus";

export async function getAbsensiDesaMonitoringService(
  desaId: number,
  query: TGenerusDesaAbsensiList
) {
  const data = await getAllGenerusDesaSummary({ desaId }, query);
  const kelas = await getCountKelasDesaService(
    { desaId },
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

export async function getAbsensiDesaMonitoringSummaryService(
  desaId: number,
  query: TAbsensiKelasPengajianGenerusList
) {
  const countGenerus = await getCountGenerusExcludeService(
    { desaId },
    query.kelasPengajian
  );
  const countKelas = await getCountKelasDesaService(
    { desaId },
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerusDesa(
    { desaId },
    query.kelasPengajian
  );

  const denominator = countGenerus.reduce((a, i) => a += i.count, 0) * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countGenerus,
    kehadiran,
  };

  return data;
}

export async function getAbsensiDesaMonitoringForDaerahService(
  daerahId: number,
  query: TGenerusDesaAbsensiListForDaerah
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

  const data = await getAllGenerusDesaSummary(
    { daerahId, desaId: query.desaId },
    query
  );
  const kelas = await getCountKelasDesaService(
    { daerahId, desaId: query.desaId },
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

export async function getAbsensiDesaMonitoringSummaryForDaerahService(
  daerahId: number,
  query: TAbsensiKelasDesaPengajianForDaerahList
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

  const countGenerus = await getCountGenerusExcludeService(
    { daerahId, desaId: query.desaId },
    query.kelasPengajian
  );
  const countKelas = await getCountKelasDesaService(
    { daerahId, desaId: query.desaId },
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerusDesa(
    { daerahId, desaId: query.desaId },
    query.kelasPengajian
  );

  const denominator = countGenerus.reduce((a, i) => a += i.count, 0) * countKelas;
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

export async function getAbsensiGenerusByDesaIdService(desaId: number) {
  return getAbsensiGenerusByDesaId(desaId);
}
