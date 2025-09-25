import { getAllGenerusDesaSummary } from "~~/server/services/absensi-desa/absensi-desa.service";
import { OGenerusDesaAbsensiList } from "~~/server/services/absensi-desa/absensi.desa.dto";
import { getAllKelasDesaOptions } from "~~/server/services/kelas-desa/kelas-desa.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusDesaAbsensiList.parse(q)
  );

  const data = await getAllGenerusDesaSummary(user.desaId!, query);
  const kelas = await getAllKelasDesaOptions(user.desaId!, {
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
