import { getGenerusOptionsKelompokService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const data = await getGenerusOptionsKelompokService(user.kelompokId!);

  return HttpResponse(data);
});
