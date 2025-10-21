import {
  createKonselingService,
  OKonselingCreate,
} from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OKonselingCreate.parse(b));

  await createKonselingService(user.daerahId, user.kelompokId!, body);

  return HttpResponse();
});
