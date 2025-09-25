import { z } from "zod/mini";
import { updateKelasGps } from "~~/server/services/kelas-gps/kelas-gps.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelasGps(parsed, user.desaId!, body);

  return HttpResponse();
});
