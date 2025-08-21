import { OMusyawarahBidangList } from "~~/server/services/musyawarah-bidang/dto/musyawarah-bidang.dto";
import { getAllMusyawarahBidang } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) =>
    OMusyawarahBidangList.parse(q)
  );

  const data = await getAllMusyawarahBidang(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
