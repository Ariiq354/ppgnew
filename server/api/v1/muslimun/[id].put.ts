import { z } from "zod/mini";
import { updateMuslimun } from "~~/server/services/muslimun/muslimun.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateMuslimun(parsed, user.kelompokId!, body);

  return HttpResponse();
});
