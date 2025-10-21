import { getDashboardKelompok } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getDashboardKelompok(
    user.daerahId,
    user.desaId!,
    user.kelompokId!
  );

  return HttpResponse(data);
});
