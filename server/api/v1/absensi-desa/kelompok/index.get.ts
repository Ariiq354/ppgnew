import { getKelompokByDesaId } from "~~/server/repository/kelompok.repo";
import { OGenerusAbsensiKelompokList } from "~~/server/services/absensi-generus/absensi-generus.dto";
import { getAllGenerusSummary } from "~~/server/services/absensi-generus/absensi-generus.service";
import { getAllKelasOptions } from "~~/server/repository/kelas-kelompok.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiKelompokList.parse(q)
  );

  const desa = await getKelompokByDesaId(user.desaId!);
  if (!desa.find((i) => i.id === query.kelompokId)) {
    throw createError({
      statusCode: 403,
      message: "There is no kelompok in your deaa",
    });
  }

  const data = await getAllGenerusSummary(query.kelompokId, query);
  const kelas = await getAllKelasOptions(query.kelompokId, {
    nama: query.kelasPengajian,
  });

  data.data = data.data.map((i) => {
    const total = kelas.data.length;
    return {
      ...i,
      tanpaKeterangan: total - i.hadir - i.izin,
      kehadiran: total > 0 ? ((i.hadir + i.izin) * 100) / total : 0,
    };
  });

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
