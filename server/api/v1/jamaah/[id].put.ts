import { OJamaahCreate, updateJamaahService } from "~~/server/modules/jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OJamaahCreate.parse(b));

  await updateJamaahService(id, user.kelompokId!, body);

  return HttpResponse();
});
