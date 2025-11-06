import type { TGenerusList } from "~~/server/utils/dto";
import {
  getAllGenerusExportMudamudi,
  getAllGenerusMudamudi,
  getAllMudamudiChart,
  getAllMudamudiExclude,
  getCountMudamudiByKelasPengajian,
  getGenerusMudamudiKelasPengajianExclude,
} from "./generus-mudamudi.repo";

export async function getAllGenerusMudamudiService(
  daerahId: number,
  query: TGenerusList
) {
  const data = await getAllGenerusMudamudi(daerahId, query);

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

export async function getAllGenerusExportMudamudiService(daerahId: number) {
  const data = await getAllGenerusExportMudamudi(daerahId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getAllMudamudiChartService(daerahId: number) {
  return await getAllMudamudiChart(daerahId);
}

export async function getGenerusMudamudiKelasPengajianExcludeService(
  daerahId: number
) {
  return await getGenerusMudamudiKelasPengajianExclude(daerahId);
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

export async function getCountMudamudiByKelasPengajianService(
  daerahId: number,
  kelasPengajian: string
) {
  return getCountMudamudiByKelasPengajian(daerahId, kelasPengajian);
}
