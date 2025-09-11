import { getAllMusyawarahBidangOptions } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";
import { OBidangSchema } from "~~/server/utils/dto";
import { viewWhitelist } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidangSchema.parse(q));

  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getAllMusyawarahBidangOptions(user.daerahId, query.bidang);

  return HttpResponse(data.data);
});
