import {
  createPengusahaService,
  OPengusahaCreate,
} from "~~/server/modules/pengusaha";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });

  const body = await readValidatedBody(event, (b) => OPengusahaCreate.parse(b));

  await createPengusahaService(user.daerahId, body);

  return HttpResponse();
});
