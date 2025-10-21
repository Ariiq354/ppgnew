import {
  OKonselingUpdate,
  updateKonselingDaerahService,
} from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, {
    bimbingan_konseling: ["manage"],
  });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OKonselingUpdate.parse(b));

  await updateKonselingDaerahService(id, user.daerahId, body);

  return HttpResponse();
});
