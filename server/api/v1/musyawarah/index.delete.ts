import { deleteMusyawarah } from "~~/server/services/musyawarah/musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteMusyawarah(user.daerahId, body.id);
  return HttpResponse();
});
