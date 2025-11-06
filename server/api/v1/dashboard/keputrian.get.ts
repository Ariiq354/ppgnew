import { getDashboardKeputrian } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const data = await getDashboardKeputrian(user.daerahId);

  return HttpResponse(data);
});
