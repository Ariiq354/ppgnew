import { getAbsensiGenerusByDesaIdService } from "../absensi-desa";
import { getAbsensiGenerusByKelompokIdService } from "../absensi-generus";
import { getCountDesaService, getDesaByDaerahIdService } from "../desa";
import {
  getAllGenerus69Service,
  getAllGenerusChartService,
  getCountGenerusService,
} from "../generus";
import { getKelasByDesaIdService } from "../kelas-desa";
import { getKelasByKelompokIdService } from "../kelas-kelompok";
import {
  getCountKelompokService,
  getKelompokByDaerahIdService,
} from "../kelompok";
import {
  getAllPengajarChartService,
  getCountPengajarService,
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

type GenerusCount = {
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

export async function getDashboard(daerahId: number) {
  const countKelompok = await getCountKelompokService(daerahId);
  const countDesa = await getCountDesaService(daerahId);
  const countGenerus = await getCountGenerusService(daerahId);
  const countPengajar = await getCountPengajarService(daerahId);

  const dataGenerus = await getAllGenerusChartService(daerahId);
  const dataPengajar = await getAllPengajarChartService(daerahId);

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

export async function getDashboardDesa(daerahId: number, desaId: number) {
  const countGenerus = await getCountGenerusService(daerahId, desaId);
  const countPengajar = await getCountPengajarService(daerahId, desaId);

  const dataGenerus = await getAllGenerusChartService(daerahId, desaId);
  const dataPengajar = await getAllPengajarChartService(daerahId, desaId);

  const absensi = await getAbsensiGenerusByDesaIdService(desaId);
  const kelas = await getKelasByDesaIdService(desaId);

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

  return data;
}

export async function getDashboardKelompok(
  daerahId: number,
  desaId: number,
  kelompokId: number
) {
  const countGenerus = await getCountGenerusService(
    daerahId,
    desaId,
    kelompokId
  );
  const countPengajar = await getCountPengajarService(
    daerahId,
    desaId,
    kelompokId
  );

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

  const absensi = await getAbsensiGenerusByKelompokIdService(kelompokId);
  const kelas = await getKelasByKelompokIdService(kelompokId);

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
