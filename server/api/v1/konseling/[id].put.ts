import { z } from "zod/mini";
import { OKonselingCreate } from "~~/server/services/konseling/dto/konseling.dto";
import { updateKonseling } from "~~/server/services/konseling/konseling.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => OKonselingCreate.parse(b));

  await updateKonseling(parsed, user.daerahId, user.kelompokId!, body);

  return HttpResponse();
});
