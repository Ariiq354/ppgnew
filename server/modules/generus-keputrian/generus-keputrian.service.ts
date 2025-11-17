import type { TMudamudiList } from "~~/server/utils/dto/generus.dto";
import {
  getAllGenerusExportKeputrian,
  getAllGenerusKeputrian,
  getAllKeputrianChart,
  getAllKeputrianExclude,
  getCountKeputrianByKelasPengajian,
  getGenerusKeputrianKelasPengajianExclude,
} from "./generus-keputrian.repo";

export async function getAllGenerusKeputrianService(
  daerahId: number,
  query: TMudamudiList
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

export async function getGenerusKeputrianKelasPengajianExcludeService(
  daerahId: number
) {
  return getGenerusKeputrianKelasPengajianExclude(daerahId);
}

export async function getCountKeputrianByKelasPengajianService(
  daerahId: number,
  kelasPengajian: string
) {
  return getCountKeputrianByKelasPengajian(daerahId, kelasPengajian);
}

export async function getAllKeputrianExcludeService(
  daerahId: number,
  query: TMudamudiAbsensiList
) {
  const data = await getAllKeputrianExclude(daerahId, query);

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
