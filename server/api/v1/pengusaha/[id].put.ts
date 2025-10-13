import {
  OPengusahaCreate,
  updatePengusahaService,
} from "~~/server/modules/pengusaha";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OPengusahaCreate.parse(b));

  await updatePengusahaService(id, user.daerahId, body);

  return HttpResponse();
});
