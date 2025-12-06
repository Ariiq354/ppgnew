import type { kelasGenerusEnum } from "~~/shared/enum";
import { getAbsensiGenerusSummaryService } from "../absensi-generus";
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
import { getKelasKeputrianByDaerahIdService } from "../kelas-keputrian";
import { getKelasMudamudiByDaerahIdService } from "../kelas-mudamudi";
import { getAllKelasTahfidzOptionsService } from "../kelas-tahfidz";
import {
  getCountKelompokService,
  getKelompokByDaerahIdService,
  getKelompokByDesaIdService,
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

async function getPercentDetail(
  daerahId: number,
  title: (typeof kelasGenerusEnum)[number]
) {
  interface KelompokDetail {
    namaKelompok: string;
    totalPercent: number;
  }

  interface DesaDetail {
    namaDesa: string;
    totalPercentDesa: number;
    kelompok: KelompokDetail[];
  }

  interface PercentDetailResult {
    nama: (typeof kelasGenerusEnum)[number];
    totalPercentAll: number;
    desa: DesaDetail[];
  }

  const result: PercentDetailResult = {
    nama: title,
    totalPercentAll: 0,
    desa: [],
  };

  let sumAllDesaPercent = 0;

  const desas = await getDesaByDaerahIdService(daerahId);

  for (const desa of desas) {
    const kelompoks = await getKelompokByDesaIdService(desa.id);

    const desaObj: DesaDetail = {
      namaDesa: desa.name, // Assuming 'nama' exists on desa object
      totalPercentDesa: 0,
      kelompok: [],
    };

    let sumKelompokPercent = 0;

    for (const kelompok of kelompoks) {
      const { kehadiran } = await getAbsensiGenerusSummaryService(
        { kelompokId: kelompok.id },
        { kelasPengajian: title }
      );

      desaObj.kelompok.push({
        namaKelompok: kelompok.name,
        totalPercent: kehadiran,
      });

      sumKelompokPercent += kehadiran;
    }

    desaObj.totalPercentDesa = sumKelompokPercent / kelompoks.length;
    result.desa.push(desaObj);
    sumAllDesaPercent += desaObj.totalPercentDesa;
  }
  result.totalPercentAll = sumAllDesaPercent / desas.length;

  return result;
}

export async function getDashboard(daerahId: number) {
  const countKelompok = await getCountKelompokService(daerahId);
  const countDesa = await getCountDesaService(daerahId);

  const dataGenerus = await getAllGenerusChartService({ daerahId });
  const dataPengajar = await getAllPengajarChartDaerahService(daerahId);

  const countGenerus = dataGenerus.length;
  const countPengajar = dataPengajar.length;

  const percentPaud = await getPercentDetail(daerahId, "PAUD");

  const percentCabeRawit = await getPercentDetail(daerahId, "Cabe Rawit");

  const percentPraremaja = await getPercentDetail(daerahId, "Praremaja");

  const percentMudamudi = await getPercentDetail(daerahId, "Muda-mudi");

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

  const percentPaud = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "PAUD" }
  );

  const percentCabeRawit = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "Cabe Rawit" }
  );

  const percentPraremaja = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "Praremaja" }
  );

  const percentMudamudi = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "Muda-mudi" }
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
    percentPaud: percentPaud.kehadiran.toFixed(2),
    percentCabeRawit: percentCabeRawit.kehadiran.toFixed(2),
    percentPraremaja: percentPraremaja.kehadiran.toFixed(2),
    percentMudamudi: percentMudamudi.kehadiran.toFixed(2),
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

  const percentPaud = await getAbsensiGenerusSummaryService(
    { desaId },
    { kelasPengajian: "PAUD" }
  );

  const percentCabeRawit = await getAbsensiGenerusSummaryService(
    { desaId },
    { kelasPengajian: "Cabe Rawit" }
  );

  const percentPraremaja = await getAbsensiGenerusSummaryService(
    { desaId },
    { kelasPengajian: "Praremaja" }
  );

  const percentMudamudi = await getAbsensiGenerusSummaryService(
    { desaId },
    { kelasPengajian: "Muda-mudi" }
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
    percentPaud: percentPaud.kehadiran.toFixed(2),
    percentCabeRawit: percentCabeRawit.kehadiran.toFixed(2),
    percentPraremaja: percentPraremaja.kehadiran.toFixed(2),
    percentMudamudi: percentMudamudi.kehadiran.toFixed(2),
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
  const percentPaud = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "PAUD" }
  );

  const percentCabeRawit = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "Cabe Rawit" }
  );

  const percentPraremaja = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "Praremaja" }
  );

  const percentMudamudi = await getAbsensiGenerusSummaryService(
    { kelompokId },
    { kelasPengajian: "Muda-mudi" }
  );

  return {
    percentPaud: percentPaud.kehadiran.toFixed(2),
    percentCabeRawit: percentCabeRawit.kehadiran.toFixed(2),
    percentPraremaja: percentPraremaja.kehadiran.toFixed(2),
    percentMudamudi: percentMudamudi.kehadiran.toFixed(2),
    countPaud: percentPaud.countGenerus,
    countCabeRawit: percentCabeRawit.countGenerus,
    countPraremaja: percentPraremaja.countGenerus,
    countMudamudi: percentMudamudi.countGenerus,
  };
}
