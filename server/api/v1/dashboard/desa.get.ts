import { getAbsensiGenerusByDesaId } from "~~/server/services/absensi-desa/absensi-desa.service";
import {
  getAllGenerusChart,
  getCountGenerus,
} from "~~/server/services/generus/generus.service";
import { getKelasByDesaId } from "~~/server/services/kelas-desa/kelas-desa.service";
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

const MudaMudiKelas = ["Remaja", "Pranikah", "Usia Mandiri"];

function getPercent(
  kelasName: string,
  absensi: any[],
  dataGenerus: any[],
  kelas: any[],
  isGroup: boolean = false
): string {
  const absensiCount = isGroup
    ? absensi.filter((i) => MudaMudiKelas.includes(i.kelasPengajian)).length
    : absensi.filter((i) => i.kelasPengajian === kelasName).length;

  const generusCount = isGroup
    ? dataGenerus.filter((i) => MudaMudiKelas.includes(i.kelasPengajian)).length
    : dataGenerus.filter((i) => i.kelasPengajian === kelasName).length;

  const kelasCount = kelas.filter((i) => i.nama === kelasName).length;

  return generusCount && kelasCount
    ? ((absensiCount * 100) / (generusCount * kelasCount)).toFixed(2)
    : "0";
}

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const countGenerus = await getCountGenerus(user.daerahId, user.desaId!);
  const countPengajar = await getCountPengajar(user.daerahId, user.desaId!);

  const dataGenerus = await getAllGenerusChart(user.daerahId, user.desaId!);
  const dataPengajar = await getAllPengajarChart(user.daerahId, user.desaId!);

  const absensi = await getAbsensiGenerusByDesaId(user.desaId!);
  const kelas = await getKelasByDesaId(user.desaId!);

  const percentPaud = getPercent("PAUD", absensi, dataGenerus, kelas);
  const percentCabeRawit = getPercent(
    "Cabe Rawit",
    absensi,
    dataGenerus,
    kelas
  );
  const percentPraremaja = getPercent("Praremaja", absensi, dataGenerus, kelas);
  const percentMudamudi = getPercent(
    "Muda-mudi",
    absensi,
    dataGenerus,
    kelas,
    true
  );

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
    percentPaud,
    percentCabeRawit,
    percentPraremaja,
    percentMudamudi,
    countGenerus,
    countPengajar,
    generusDatasets,
    generusGroupDatasets,
    pengajarDatasets,
    pengajarGroupDatasets,
  };

  return HttpResponse(data);
});
