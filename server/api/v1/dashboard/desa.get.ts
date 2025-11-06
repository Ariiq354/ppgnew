import { getDashboardDesa } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getDashboardDesa(user.desaId!);

  return HttpResponse(data);
});
