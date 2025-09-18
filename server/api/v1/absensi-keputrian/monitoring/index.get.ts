import { getAllKeputrianSummary } from "~~/server/services/absensi-keputrian/absensi-keputrian.service";
import { OKeputrianAbsensiList } from "~~/server/services/absensi-keputrian/dto/absensi-keputrian.dto";
import { getAllKelasKeputrianOptions } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKeputrianAbsensiList.parse(q)
  );

  const data = await getAllKeputrianSummary(user.daerahId, query);
  const kelas = await getAllKelasKeputrianOptions(user.daerahId, {
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
