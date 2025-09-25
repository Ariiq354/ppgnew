import { OMusyawarahBidangList } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.dto";
import { getAllMusyawarahBidang } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";
import { viewWhitelist } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OMusyawarahBidangList.parse(q)
  );

  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getAllMusyawarahBidang(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
