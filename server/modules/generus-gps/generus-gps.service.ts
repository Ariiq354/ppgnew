import type { TGenerusBaseList } from "~~/server/utils/dto";
import {
  getAllGenerusExportGps,
  getAllGenerusGPS,
  getAllGpsExclude,
  getCountGpsExclude,
} from "./generus-gps.repo";

export async function getAllGenerusExportGpsService(desaId: number) {
  const data = await getAllGenerusExportGps(desaId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getAllGenerusGpsService(
  daerahId: number,
  query: TGenerusBaseList
) {
  const data = await getAllGenerusGPS(daerahId, query);

  const newData = data.data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: newData,
    metadata,
  };
}

export async function getCountGpsExcludeService(desaId: number) {
  return getCountGpsExclude(desaId);
}

export async function getAllGpsExcludeService(
  desaId: number,
  query: TSearchPagination
) {
  const data = await getAllGpsExclude(desaId, query);

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
