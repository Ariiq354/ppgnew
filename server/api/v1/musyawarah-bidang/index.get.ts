import { OMusyawarahBidangList } from "~~/server/api/v1/musyawarah-bidang/_dto";
import { getAllMusyawarahBidangService } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OMusyawarahBidangList.parse(q)
  );

  const data = await getAllMusyawarahBidangService(user, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
