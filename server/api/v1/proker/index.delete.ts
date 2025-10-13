import { deleteProkerService } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteBidang.parse(b));

  await deleteProkerService(user, body);

  return HttpResponse();
});
