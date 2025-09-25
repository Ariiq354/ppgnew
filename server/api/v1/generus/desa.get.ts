import { OGenerusList } from "~~/server/services/generus/generus.dto";
import { getAllGenerus } from "~~/server/services/generus/generus.service";
import { getCurrentKelas } from "~~/server/utils/common";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  query.desaId = user.desaId!;

  const data = await getAllGenerus(user.daerahId, query);

  const newData = data.data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(newData, metadata);
});
