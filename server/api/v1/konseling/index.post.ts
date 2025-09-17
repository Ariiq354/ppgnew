import { OKonselingCreate } from "~~/server/services/konseling/dto/konseling.dto";
import { createKonseling } from "~~/server/services/konseling/konseling.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OKonselingCreate.parse(b));

  await createKonseling(user.daerahId, user.kelompokId!, body);

  return HttpResponse();
});
