import { getAllMusyawarahBidangOptionsService } from "~~/server/modules/musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidangSchema.parse(q));

  const data = await getAllMusyawarahBidangOptionsService(user, query);

  return HttpResponse(data.data);
});
