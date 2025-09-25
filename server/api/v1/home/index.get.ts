import { getCountDesa } from "~~/server/repository/desa.repo";
import { getCountKelompok } from "~~/server/repository/kelompok.repo";
import {
  getAllGenerusChart,
  getCountGenerus,
} from "~~/server/services/generus/generus.service";
import {
  getAllPengajarChart,
  getCountPengajar,
} from "~~/server/services/pengajar/pengajar.service";

const pengajianOptions = [
  "PAUD",
  "Cabe Rawit",
  "Praremaja",
  "Remaja",
  "Pranikah",
  "Usia Mandiri",
];
const statusOptions = [
  "Mubalig Tugasan",
  "Mubalig Setempat",
  "Asisten Pengajar",
];

type GroupData = {
  gender: string;
  [key: string]: any;
};

function groupByField(
  data: GroupData[],
  groupField: string,
  options: string[]
): { name: string; "Laki-laki": number; Perempuan: number }[] {
  const result = options.map((opt) => ({
    name: opt,
    "Laki-laki": 0,
    Perempuan: 0,
  }));

  data.forEach((curr) => {
    const groupValue = curr[groupField];
    const target = result.find((r) => r.name === groupValue);
    if (target) {
      target[curr.gender as "Laki-laki" | "Perempuan"]++;
    }
  });

  return result;
}

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const countKelompok = await getCountKelompok(user.daerahId);
  const countDesa = await getCountDesa(user.daerahId);
  const countGenerus = await getCountGenerus(user.daerahId);
  const countPengajar = await getCountPengajar(user.daerahId);

  const dataGenerus = await getAllGenerusChart(user.daerahId);
  const dataPengajar = await getAllPengajarChart(user.daerahId);

  const generusDatasets = groupByField(
    dataGenerus,
    "kelasPengajian",
    pengajianOptions
  );
  const pengajarDatasets = groupByField(dataPengajar, "status", statusOptions);

  const generusGroupDatasets = generusDatasets.map((i) => ({
    name: i.name,
    value: i["Laki-laki"] + i.Perempuan,
  }));
  const pengajarGroupDatasets = pengajarDatasets.map((i) => ({
    name: i.name,
    value: i["Laki-laki"] + i.Perempuan,
  }));

  const data = {
    countKelompok,
    countDesa,
    countGenerus,
    countPengajar,
    generusDatasets,
    generusGroupDatasets,
    pengajarDatasets,
    pengajarGroupDatasets,
  };

  return HttpResponse(data);
});
