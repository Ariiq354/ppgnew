import { OGenerusList } from "~~/server/services/generus/dto/generus.dto";
import { getAllGenerus } from "~~/server/services/generus/generus.service";
import { getCurrentKelas } from "~~/server/utils/common";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  query.kelompokId = user.kelompokId!;
  query.desaId = user.desaId!;

  const data = await getAllGenerus(user.daerahId, query);

  data.data = data.data.map((i) => ({
    ...i,
    kelasSekolah: getCurrentKelas(i.kelasSekolah, i.tanggalMasukKelas),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
