import {
  getAbsensiGenerusByDesaIdService,
  getGenerusDesaAbsensiExcludeService,
} from "../absensi-desa";
import {
  getAbsensiGenerusByKelompokIdService,
  getGenerusAbsensiExcludeService,
} from "../absensi-generus";
import { getAbsensiKeputrianByDaerahIdService } from "../absensi-keputrian";
import {
  getAbsensiMudamudiByDaerahIdService,
  getGenerusMudamudiAbsensiExcludeService,
} from "../absensi-mudamudi";
import { getAbsensiTahfidzByDaerahIdService } from "../absensi-tahfidz";
import { getCountDesaService, getDesaByDaerahIdService } from "../desa";
import { getAllGenerus69Service, getAllGenerusChartService } from "../generus";
import {
  getAllKeputrianChartService,
  getGenerusKeputrianAbsensiExcludeService,
} from "../generus-keputrian";
import { getAllMudamudiChartService } from "../generus-mudamudi";
import {
  getAllTahfidzChartService,
  getCountTahfidzService,
} from "../generus-tahfidz";
import { getKelasByDesaIdService } from "../kelas-desa";
import { getKelasByKelompokIdService } from "../kelas-kelompok";
import { getKelasKeputrianByDaerahIdService } from "../kelas-keputrian";
import { getKelasMudamudiByDaerahIdService } from "../kelas-mudamudi";
import { getAllKelasTahfidzOptionsService } from "../kelas-tahfidz";
import {
  getCountKelompokService,
  getKelompokByDaerahIdService,
} from "../kelompok";
import { getAllPengajarChartService } from "../pengajar";

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

const MudaMudiKelas = ["Remaja", "Pranikah", "Usia Mandiri"];
const RemajaKelas = ["Remaja", "Pranikah"];

type GroupData = {
  gender: string;
  [key: string]: any;
};

type Generus = {
  kelasSekolah: string;
  tanggalMasukKelas: Date;
  desaId: number;
  kelompokId: number;
  gender: string;
};

export type GenerusCount = {
  countLaki6: number;
  countPerempuan6: number;
  countLaki9: number;
  countPerempuan9: number;
};

function summarizeGenerus(generus: Generus[]) {
  const result: Record<
    number,
    {
      desaId: number;
      kelompokId: number;
      countLaki6: number;
      countPerempuan6: number;
      countLaki9: number;
      countPerempuan9: number;
    }
  > = {};

  for (const g of generus) {
    if (!result[g.kelompokId]) {
      result[g.kelompokId] = {
        desaId: g.desaId,
        kelompokId: g.kelompokId,
        countLaki6: 0,
        countPerempuan6: 0,
        countLaki9: 0,
        countPerempuan9: 0,
      };
    }

    if (g.kelasSekolah === "SD 6") {
      if (g.gender === "Laki-laki") {
        result[g.kelompokId]!.countLaki6++;
      } else {
        result[g.kelompokId]!.countPerempuan6++;
      }
    }

    if (g.kelasSekolah === "SMP 9") {
      if (g.gender === "Laki-laki") {
        result[g.kelompokId]!.countLaki9++;
      } else {
        result[g.kelompokId]!.countPerempuan9++;
      }
    }
  }

  return Object.values(result);
}

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

function getPercentCombined(
  kelasName: string,
  absensi: any[],
  dataGenerus: any[],
  kelas: any[],
  groupKelas: string[],
  isGroup = false
): string {
  const absensiCount = absensi.filter(
    (i) =>
      i.kelasPengajian === kelasName &&
      (isGroup
        ? groupKelas.includes(i.kelasPengajianGenerus)
        : i.kelasPengajianGenerus === kelasName)
  ).length;

  const generusCount = isGroup
    ? dataGenerus.filter((i) => groupKelas.includes(i.kelasPengajian)).length
    : dataGenerus.filter((i) => i.kelasPengajian === kelasName).length;

  const kelasCount = kelas.filter((i) => i.nama === kelasName).length;

  return generusCount && kelasCount
    ? ((absensiCount * 100) / (generusCount * kelasCount)).toFixed(2)
    : "0";
}

export async function getDashboard(daerahId: number) {
  const countKelompok = await getCountKelompokService(daerahId);
  const countDesa = await getCountDesaService(daerahId);

  const dataGenerus = await getAllGenerusChartService(daerahId);
  const dataPengajar = await getAllPengajarChartService(daerahId);

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

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

  return data;
}

export async function getDashboardKelompok(
  daerahId: number,
  desaId: number,
  kelompokId: number
) {
  const dataGenerus = await getAllGenerusChartService(
    daerahId,
    desaId,
    kelompokId
  );
  const dataPengajar = await getAllPengajarChartService(
    daerahId,
    desaId,
    kelompokId
  );

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

  const dataGenerusExclude = await getGenerusAbsensiExcludeService(kelompokId);

  const absensi = await getAbsensiGenerusByKelompokIdService(kelompokId);
  const kelas = await getKelasByKelompokIdService(kelompokId);

  const percentPaud = getPercentCombined(
    "PAUD",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas
  );
  const percentCabeRawit = getPercentCombined(
    "Cabe Rawit",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas
  );
  const percentPraremaja = getPercentCombined(
    "Praremaja",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas
  );
  const percentMudamudi = getPercentCombined(
    "Muda-mudi",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas,
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

  return data;
}

export async function getDashboardDesa(daerahId: number, desaId: number) {
  const dataGenerus = await getAllGenerusChartService(daerahId, desaId);
  const dataPengajar = await getAllPengajarChartService(daerahId, desaId);

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

  const dataExclude = await getGenerusDesaAbsensiExcludeService(desaId);

  const absensi = await getAbsensiGenerusByDesaIdService(desaId);
  const kelas = await getKelasByDesaIdService(desaId);

  const percentPaud = getPercentCombined(
    "PAUD",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas
  );
  const percentCabeRawit = getPercentCombined(
    "Cabe Rawit",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas
  );
  const percentPraremaja = getPercentCombined(
    "Praremaja",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas
  );
  const percentMudamudi = getPercentCombined(
    "Muda-mudi",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas,
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

  return data;
}

export async function getDashboardTahfidz(daerahId: number) {
  const countGenerus = await getCountTahfidzService(daerahId);

  const dataGenerus = await getAllTahfidzChartService(daerahId);

  const absensi = await getAbsensiTahfidzByDaerahIdService(daerahId);
  const kelas = await getAllKelasTahfidzOptionsService(daerahId);

  const percentAbsensi =
    countGenerus && kelas.data.length > 0
      ? (
          (absensi.length * 100) /
          (dataGenerus.length * kelas.data.length)
        ).toFixed(2)
      : "0";

  const generusDatasets = groupByField(
    dataGenerus,
    "kelasPengajian",
    pengajianOptions
  );

  const generusGroupDatasets = generusDatasets.map((i) => ({
    name: i.name,
    value: i["Laki-laki"] + i.Perempuan,
  }));

  const data = {
    percentAbsensi,
    countGenerus,
    generusDatasets,
    generusGroupDatasets,
  };

  return data;
}

export async function getDashboardKeputrian(daerahId: number) {
  const dataGenerus = await getAllKeputrianChartService(daerahId);

  const countGenerus = dataGenerus.length;

  const dataExclude = await getGenerusKeputrianAbsensiExcludeService(daerahId);

  const absensi = await getAbsensiKeputrianByDaerahIdService(daerahId);
  const kelas = await getKelasKeputrianByDaerahIdService(daerahId);

  const percentMudamudi = getPercentCombined(
    "Muda-mudi",
    absensi,
    dataExclude,
    kelas,
    RemajaKelas,
    true
  );
  const percentUsiaMandiri = getPercentCombined(
    "Usia Mandiri",
    absensi,
    dataExclude,
    kelas,
    RemajaKelas
  );

  const generusDatasets = groupByField(
    dataGenerus,
    "kelasPengajian",
    pengajianOptions
  );

  const generusGroupDatasets = generusDatasets.map((i) => ({
    name: i.name,
    value: i["Laki-laki"] + i.Perempuan,
  }));

  const data = {
    percentUsiaMandiri,
    percentMudamudi,
    countGenerus,
    generusDatasets,
    generusGroupDatasets,
  };

  return data;
}

export async function getDashboardMudamudi(daerahId: number) {
  const dataGenerus = await getAllMudamudiChartService(daerahId);

  const countGenerus = dataGenerus.length;

  const dataExclude = await getGenerusMudamudiAbsensiExcludeService(daerahId);

  const absensi = await getAbsensiMudamudiByDaerahIdService(daerahId);
  const kelas = await getKelasMudamudiByDaerahIdService(daerahId);

  const percentMudamudi = getPercentCombined(
    "Muda-mudi",
    absensi,
    dataExclude,
    kelas,
    RemajaKelas,
    true
  );
  const percentUsiaMandiri = getPercentCombined(
    "Usia Mandiri",
    absensi,
    dataExclude,
    kelas,
    RemajaKelas
  );

  const generusDatasets = groupByField(
    dataGenerus,
    "kelasPengajian",
    pengajianOptions
  );

  const generusGroupDatasets = generusDatasets.map((i) => ({
    name: i.name,
    value: i["Laki-laki"] + i.Perempuan,
  }));

  const data = {
    percentUsiaMandiri,
    percentMudamudi,
    countGenerus,
    generusDatasets,
    generusGroupDatasets,
  };

  return data;
}

export async function getKelas69(daerahId: number) {
  const kelompok = await getKelompokByDaerahIdService(daerahId);
  const desa = await getDesaByDaerahIdService(daerahId);

  let generus = await getAllGenerus69Service(daerahId);

  generus = generus.map((i) => ({
    ...i,
    kelasSekolah: getCurrentKelas(i.kelasSekolah, i.tanggalMasukKelas),
  }));

  const generusData = summarizeGenerus(generus);

  const kelompokCounts: Record<number, GenerusCount> = {};
  const desaCounts: Record<number, GenerusCount> = {};
  const grandTotal = {
    countLaki6: 0,
    countPerempuan6: 0,
    countLaki9: 0,
    countPerempuan9: 0,
  };

  // per kelompok
  for (const r of generusData) {
    kelompokCounts[r.kelompokId] = {
      countLaki6: r.countLaki6,
      countPerempuan6: r.countPerempuan6,
      countLaki9: r.countLaki9,
      countPerempuan9: r.countPerempuan9,
    };
  }

  // per desa
  for (const r of generusData) {
    desaCounts[r.desaId] ??= {
      countLaki6: 0,
      countPerempuan6: 0,
      countLaki9: 0,
      countPerempuan9: 0,
    };
    desaCounts[r.desaId]!.countLaki6 += r.countLaki6;
    desaCounts[r.desaId]!.countPerempuan6 += r.countPerempuan6;
    desaCounts[r.desaId]!.countLaki9 += r.countLaki9;
    desaCounts[r.desaId]!.countPerempuan9 += r.countPerempuan9;
  }

  // total
  for (const r of generusData) {
    grandTotal.countLaki6 += r.countLaki6;
    grandTotal.countPerempuan6 += r.countPerempuan6;
    grandTotal.countLaki9 += r.countLaki9;
    grandTotal.countPerempuan9 += r.countPerempuan9;
  }

  const data = {
    kelompok,
    desa,
    kelompokCounts,
    desaCounts,
    grandTotal,
  };

  return data;
}
