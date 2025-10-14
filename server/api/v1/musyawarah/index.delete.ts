import { deleteMusyawarahService } from "~~/server/modules/musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteMusyawarahService(user.daerahId, body);
  return HttpResponse();
});
