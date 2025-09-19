import { z } from "zod/mini";
import { updateKelas } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelas(parsed, user.kelompokId!, body);

  return HttpResponse();
});
