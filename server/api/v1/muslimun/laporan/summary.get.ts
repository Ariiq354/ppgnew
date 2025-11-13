import { getAbsensiSummaryService } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAbsensiSummaryService(user.kelompokId!);

  return HttpResponse(data);
});
