import { getDesaByDaerahId } from "~~/server/repository/desa.repo";
import { getKelompokByDaerahId } from "~~/server/repository/kelompok.repo";
import { getAllGenerus69 } from "~~/server/repository/generus.repo";

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

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const kelompok = await getKelompokByDaerahId(user.daerahId);
  const desa = await getDesaByDaerahId(user.daerahId);

  let generus = await getAllGenerus69(user.daerahId);

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

  return HttpResponse(data);
});
