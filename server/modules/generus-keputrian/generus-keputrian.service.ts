import type { TGenerusList } from "~~/server/utils/dto";
import {
  getAllGenerusExportKeputrian,
  getAllGenerusKeputrian,
  getAllKeputrianChart,
  getGenerusKeputrianAbsensiExclude,
} from "./generus-keputrian.repo";

export async function getAllGenerusKeputrianService(
  daerahId: number,
  query: TGenerusList
) {
  const data = await getAllGenerusKeputrian(daerahId, query);

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

export async function getAllGenerusExportKeputrianService(daerahId: number) {
  const data = await getAllGenerusExportKeputrian(daerahId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getAllKeputrianChartService(daerahId: number) {
  return await getAllKeputrianChart(daerahId);
}

export async function getGenerusKeputrianAbsensiExcludeService(
  daerahId: number
) {
  return getGenerusKeputrianAbsensiExclude(daerahId);
}
