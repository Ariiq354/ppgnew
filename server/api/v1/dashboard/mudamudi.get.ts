import { getDashboardMudamudi } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const data = await getDashboardMudamudi(user.daerahId);

  return HttpResponse(data);
});
