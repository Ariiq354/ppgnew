import { OProkerCreate, updateProkerService } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OProkerCreate.parse(b));

  await updateProkerService(id, user, body);

  return HttpResponse();
});
