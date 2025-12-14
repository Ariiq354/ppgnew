import { deleteProkerService } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteBidang.parse(b));

  await deleteProkerService(user, body);

  return HttpResponse();
});
