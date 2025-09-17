import { OPengajianList } from "~~/server/services/pengajian/dto/pengajian.dto";
import { getAllPengajian } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OPengajianList.parse(q));

  const data = await getAllPengajian(user.kelompokId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
