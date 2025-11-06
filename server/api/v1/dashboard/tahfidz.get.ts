import { getDashboardTahfidz } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const data = await getDashboardTahfidz(user.daerahId);

  return HttpResponse(data);
});
