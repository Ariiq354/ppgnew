import type { TGenerusBaseList } from "~~/server/utils/dto";
import {
  getAllGenerusExportTahfidz,
  getAllGenerusTahfidz,
  getAllTahfidzChart,
  getAllTahfidzExclude,
  getCountGenerusTahfidzExclude,
} from "./generus-tahfidz.repo";

export async function getAllGenerusTahfidzService(
  daerahId: number,
  query: TGenerusBaseList
) {
  const data = await getAllGenerusTahfidz(daerahId, query);

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

export async function getAllGenerusExportTahfidzService(daerahId: number) {
  const data = await getAllGenerusExportTahfidz(daerahId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getAllTahfidzChartService(daerahId: number) {
  return await getAllTahfidzChart(daerahId);
}

export async function getCountGenerusTahfidzExcludeService(daerahId: number) {
  return getCountGenerusTahfidzExclude(daerahId);
}

export async function getAllTahfidzExcludeService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllTahfidzExclude(daerahId, query);

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
