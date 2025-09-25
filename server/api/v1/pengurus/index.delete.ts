import { deletePengurusService } from "~~/server/services/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deletePengurusService(user, body);

  return HttpResponse();
});
