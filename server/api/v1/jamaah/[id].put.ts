import { OJamaahCreate } from "~~/server/api/v1/jamaah/_dto";
import { updateJamaah } from "~~/server/repository/jamaah.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OJamaahCreate.parse(b));

  await updateJamaah(id, user.kelompokId!, body);

  return HttpResponse();
});
