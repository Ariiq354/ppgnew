import { getGenerusOptionsKelompok } from "~~/server/services/generus/generus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const data = await getGenerusOptionsKelompok(user.kelompokId!);

  return HttpResponse(data);
});
