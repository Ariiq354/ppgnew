import { OGenerusList } from "~~/server/services/generus/dto/generus.dto";
import { getAllGenerus } from "~~/server/services/generus/generus.service";
import { getCurrentKelas } from "~~/server/utils/common";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

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
