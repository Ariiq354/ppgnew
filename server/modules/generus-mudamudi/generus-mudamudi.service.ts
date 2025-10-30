import type { TGenerusList } from "~~/server/utils/dto";
import {
  getAllGenerusExportMudamudi,
  getAllGenerusMudamudi,
  getAllMudamudiChart,
  getCountMudamudi,
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

export async function getCountMudamudiService(daerahId: number) {
  return await getCountMudamudi(daerahId);
}

export async function getAllMudamudiChartService(daerahId: number) {
  return await getAllMudamudiChart(daerahId);
}
