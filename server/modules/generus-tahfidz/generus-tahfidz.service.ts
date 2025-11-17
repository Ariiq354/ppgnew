import type { TGenerusBaseList } from "~~/server/utils/dto/generus.dto";
import {
  getAllGenerusExportTahfidz,
  getAllGenerusTahfidz,
  getAllTahfidzChart,
  getAllTahfidzExclude,
  getCountGenerusTahfidzExclude,
} from "./generus-tahfidz.repo";

export async function getAllGenerusTahfidzService(
  desaId: number,
  query: TGenerusBaseList
) {
  const data = await getAllGenerusTahfidz(desaId, query);

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

export async function getAllGenerusExportTahfidzService(desaId: number) {
  const data = await getAllGenerusExportTahfidz(desaId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getAllTahfidzChartService(desaId: number) {
  return await getAllTahfidzChart(desaId);
}

export async function getCountGenerusTahfidzExcludeService(desaId: number) {
  return getCountGenerusTahfidzExclude(desaId);
}

export async function getAllTahfidzExcludeService(
  desaId: number,
  query: TSearchPagination
) {
  const data = await getAllTahfidzExclude(desaId, query);

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
