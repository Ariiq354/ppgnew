import { getAllPengajianOptions } from "~~/server/services/pengajian/pengajian.service";
import { OJamaahList } from "~~/server/services/jamaah/dto/jamaah.dto";
import { getAllJamaahAbsensi } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OJamaahList.parse(q));

  const data = await getAllJamaahAbsensi(user.kelompokId!, query);
  const pengajian = await getAllPengajianOptions(user.kelompokId!);

  data.data = data.data.map((i) => {
    const total = pengajian.data.length;
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
