import { exportProkerService } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidang.parse(q));

  return await exportProkerService(event, user, query);
});
