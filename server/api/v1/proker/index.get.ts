import { OProkerList } from "~~/server/services/proker/proker.dto";
import { getAllProker } from "~~/server/services/proker/proker.service";
import { viewWhitelist } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OProkerList.parse(q));

  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getAllProker(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
