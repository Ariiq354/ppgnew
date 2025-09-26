import { OGenerusList } from "~~/server/api/v1/generus/_dto";
import { getAllGenerus } from "~~/server/repository/generus.repo";
import { getCurrentKelas } from "~~/server/utils/common";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  query.kelompokId = user.kelompokId!;
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
