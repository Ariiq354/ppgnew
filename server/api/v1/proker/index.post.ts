import { createProkerService, OProkerCreate } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["manage"] });

  const body = await readValidatedBody(event, (b) => OProkerCreate.parse(b));

  await createProkerService(user, body);

  return HttpResponse();
});
