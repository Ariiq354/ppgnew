import { z } from "zod/mini";
import { OJamaahCreate } from "~~/server/services/jamaah/dto/jamaah.dto";
import { updateJamaah } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => OJamaahCreate.parse(b));

  await updateJamaah(parsed, user.kelompokId!, body);

  return HttpResponse();
});
