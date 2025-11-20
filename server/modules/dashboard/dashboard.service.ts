import { getAbsensiGenerusByDesaIdService } from "../absensi-desa";
import {
  getAbsensiGenerusByDaerahIdService,
  getAbsensiGenerusByKelompokIdService,
} from "../absensi-generus";
import { getAbsensiKeputrianByDaerahIdService } from "../absensi-keputrian";
import { getAbsensiMudamudiByDaerahIdService } from "../absensi-mudamudi";
import { getCountAbsensiTahfidzService } from "../absensi-tahfidz";
import { getCountDesaService, getDesaByDaerahIdService } from "../desa";
import { getAllGenerus69Service, getAllGenerusChartService } from "../generus";
import {
  getAllKeputrianChartService,
  getGenerusKeputrianKelasPengajianExcludeService,
} from "../generus-keputrian";
import {
  getAllMudamudiChartService,
  getGenerusMudamudiKelasPengajianExcludeService,
} from "../generus-mudamudi";
import {
  getAllTahfidzChartService,
  getCountGenerusTahfidzExcludeService,
} from "../generus-tahfidz";
import { getGenerusKelasPengajianExclude } from "../generus/generus.repo";
import { getKelasByDesaIdService } from "../kelas-desa";
import {
  getKelasByDaerahIdService,
  getKelasByKelompokIdService,
} from "../kelas-kelompok";
import { getKelasKeputrianByDaerahIdService } from "../kelas-keputrian";
import { getKelasMudamudiByDaerahIdService } from "../kelas-mudamudi";
import { getAllKelasTahfidzOptionsService } from "../kelas-tahfidz";
import {
  getCountKelompokService,
  getKelompokByDaerahIdService,
} from "../kelompok";
import {
  getAllPengajarChartDaerahService,
  getAllPengajarChartDesaService,
  getAllPengajarChartKelompokService,
} from "../pengajar";

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
  absensi: {
    kelasPengajianGenerus: string;
    kelasPengajian: string;
    kelompokId: number;
  }[],
  dataGenerus: { kelasPengajian: string; kelompokId: number }[],
  kelas: { nama: string; kelompokId: number }[],
  groupKelas: string[],
  isGroup = false
): string {
  // Step 1: take all kelompokId that have this kelasName
  const kelompokIds = Array.from(
    new Set(kelas.filter((k) => k.nama === kelasName).map((k) => k.kelompokId))
  );

  const percentages: number[] = [];

  for (const kid of kelompokIds) {
    // Step 2: Absensi for this kelompok + same kelas + student still in that kelas
    const abs = absensi.filter(
      (i) =>
        i.kelompokId === kid &&
        i.kelasPengajian === kelasName &&
        (isGroup
          ? groupKelas.includes(i.kelasPengajianGenerus)
          : i.kelasPengajianGenerus === kelasName)
    );

    const gens = dataGenerus.filter(
      (i) =>
        i.kelompokId === kid &&
        (isGroup
          ? groupKelas.includes(i.kelasPengajian)
          : i.kelasPengajian === kelasName)
    );
    if (gens.length === 0) continue;

    // Step 4: Count kelas meetings for this kelompok
    const kls = kelas.filter(
      (i) => i.kelompokId === kid && i.nama === kelasName
    );

    const absensiCount = abs.length;
    const generusCount = gens.length;
    const kelasCount = kls.length;

    if (generusCount > 0 && kelasCount > 0) {
      const percent = (absensiCount * 100) / (generusCount * kelasCount);
      percentages.push(percent);
    }
  }

  // Step 5: No data → 0%
  if (percentages.length === 0) return "0.00";

  // Step 6: Average across kelompok
  const avg = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;

  return avg.toFixed(2);
}

function getPercentCombinedNoKelompok(
  kelasName: string,
  absensi: {
    kelasPengajianGenerus: string;
    kelasPengajian: string;
  }[],
  dataGenerus: { kelasPengajian: string }[],
  kelas: { nama: string }[],
  groupKelas: string[],
  isGroup = false
): string {
  const abs = absensi.filter(
    (i) =>
      i.kelasPengajian === kelasName &&
      (isGroup
        ? groupKelas.includes(i.kelasPengajianGenerus)
        : i.kelasPengajianGenerus === kelasName)
  );

  const gens = dataGenerus.filter((i) =>
    isGroup
      ? groupKelas.includes(i.kelasPengajian)
      : i.kelasPengajian === kelasName
  );

  const kls = kelas.filter((i) => i.nama === kelasName);

  const absensiCount = abs.length;
  const generusCount = gens.length;
  const kelasCount = kls.length;

  return generusCount && kelasCount
    ? ((absensiCount * 100) / (generusCount * kelasCount)).toFixed(2)
    : "0.00";
}

export async function getDashboard(daerahId: number) {
  const countKelompok = await getCountKelompokService(daerahId);
  const countDesa = await getCountDesaService(daerahId);

  const dataGenerus = await getAllGenerusChartService({ daerahId });
  const dataPengajar = await getAllPengajarChartDaerahService(daerahId);

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

  const dataGenerusExclude = await getGenerusKelasPengajianExclude({
    daerahId,
  });

  const absensi = await getAbsensiGenerusByDaerahIdService(daerahId);
  const kelas = await getKelasByDaerahIdService(daerahId);

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

export async function getDashboardKelompok(kelompokId: number) {
  const dataGenerus = await getAllGenerusChartService({ kelompokId });
  const dataPengajar = await getAllPengajarChartKelompokService(kelompokId);

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

  const dataGenerusExclude = await getGenerusKelasPengajianExclude({
    kelompokId,
  });

  const absensi = await getAbsensiGenerusByKelompokIdService(kelompokId);
  const kelas = await getKelasByKelompokIdService(kelompokId);

  const percentPaud = getPercentCombinedNoKelompok(
    "PAUD",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas
  );
  const percentCabeRawit = getPercentCombinedNoKelompok(
    "Cabe Rawit",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas
  );

  const percentPraremaja = getPercentCombinedNoKelompok(
    "Praremaja",
    absensi,
    dataGenerusExclude,
    kelas,
    MudaMudiKelas
  );
  const percentMudamudi = getPercentCombinedNoKelompok(
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

export async function getDashboardDesa(desaId: number) {
  const dataGenerus = await getAllGenerusChartService({ desaId });
  const dataPengajar = await getAllPengajarChartDesaService(desaId);

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

  const dataExclude = await getGenerusKelasPengajianExclude({
    desaId,
  });

  const absensi = await getAbsensiGenerusByDesaIdService(desaId);
  const kelas = await getKelasByDesaIdService(desaId);

  const percentPaud = getPercentCombinedNoKelompok(
    "PAUD",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas
  );
  const percentCabeRawit = getPercentCombinedNoKelompok(
    "Cabe Rawit",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas
  );
  const percentPraremaja = getPercentCombinedNoKelompok(
    "Praremaja",
    absensi,
    dataExclude,
    kelas,
    MudaMudiKelas
  );
  const percentMudamudi = getPercentCombinedNoKelompok(
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
  const dataGenerus = await getAllTahfidzChartService(daerahId);

  const countGenerus = dataGenerus.length;

  const dataExclude = await getCountGenerusTahfidzExcludeService(daerahId);

  const absensi = await getCountAbsensiTahfidzService(daerahId);
  const kelas = await getAllKelasTahfidzOptionsService(daerahId);

  const percentAbsensi =
    dataExclude && kelas.data.length > 0
      ? ((absensi * 100) / (dataExclude * kelas.data.length)).toFixed(2)
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

  const dataExclude =
    await getGenerusKeputrianKelasPengajianExcludeService(daerahId);

  const absensi = await getAbsensiKeputrianByDaerahIdService(daerahId);
  const kelas = await getKelasKeputrianByDaerahIdService(daerahId);

  const percentMudamudi = getPercentCombinedNoKelompok(
    "Muda-mudi",
    absensi,
    dataExclude,
    kelas,
    RemajaKelas,
    true
  );
  const percentUsiaMandiri = getPercentCombinedNoKelompok(
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

  const dataExclude =
    await getGenerusMudamudiKelasPengajianExcludeService(daerahId);

  const absensi = await getAbsensiMudamudiByDaerahIdService(daerahId);
  const kelas = await getKelasMudamudiByDaerahIdService(daerahId);

  const percentMudamudi = getPercentCombinedNoKelompok(
    "Muda-mudi",
    absensi,
    dataExclude,
    kelas,
    RemajaKelas,
    true
  );
  const percentUsiaMandiri = getPercentCombinedNoKelompok(
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

export async function getAbsensiSummaryService(kelompokId: number) {
  const dataGenerusExclude = await getGenerusKelasPengajianExclude({
    kelompokId,
  });

  const absensi = await getAbsensiGenerusByKelompokIdService(kelompokId);
  const kelas = await getKelasByKelompokIdService(kelompokId);

  const countPaud = dataGenerusExclude.filter(
    (i) => i.kelasPengajian === "PAUD"
  ).length;
  const countCabeRawit = dataGenerusExclude.filter(
    (i) => i.kelasPengajian === "Cabe Rawit"
  ).length;
  const countPraremaja = dataGenerusExclude.filter(
    (i) => i.kelasPengajian === "Praremaja"
  ).length;
  const countMudamudi = dataGenerusExclude.filter((i) =>
    MudaMudiKelas.includes(i.kelasPengajian)
  ).length;

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

  return {
    percentPaud,
    percentCabeRawit,
    percentPraremaja,
    percentMudamudi,
    countPaud,
    countCabeRawit,
    countPraremaja,
    countMudamudi,
  };
}
