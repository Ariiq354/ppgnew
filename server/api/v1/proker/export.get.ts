import { exportProkerService } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidangSchema.parse(q));

  return await exportProkerService(event, user, query);
});
