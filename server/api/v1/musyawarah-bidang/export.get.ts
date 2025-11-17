import { exportMusyawarahBidangService } from "~~/server/modules/musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidang.parse(q));

  return exportMusyawarahBidangService(event, user, query);
});
