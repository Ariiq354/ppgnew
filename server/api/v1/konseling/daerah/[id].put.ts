import { z } from "zod/mini";
import { OKonselingUpdate } from "~~/server/services/konseling/dto/konseling.dto";
import { updateKonselingDaerah } from "~~/server/services/konseling/konseling.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, {
    bimbingan_konseling: ["manage"],
  });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => OKonselingUpdate.parse(b));

  await updateKonselingDaerah(parsed, user.daerahId, body);

  return HttpResponse();
});
