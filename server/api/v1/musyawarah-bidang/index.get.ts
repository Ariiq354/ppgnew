import {
  getAllMusyawarahBidangService,
  OMusyawarahBidangList,
} from "~~/server/modules/musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OMusyawarahBidangList.parse(q)
  );

  const data = await getAllMusyawarahBidangService(user, query);

  return HttpResponse(data.data, data.metadata);
});
