import {
  OKonselingCreate,
  updateKonselingService,
} from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OKonselingCreate.parse(b));

  await updateKonselingService(id, user.daerahId, user.kelompokId!, body);

  return HttpResponse();
});
