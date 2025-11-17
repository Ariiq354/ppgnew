import { deleteMusyawarahBidangService } from "~~/server/modules/musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteBidang.parse(b));

  await deleteMusyawarahBidangService(user, body);

  return HttpResponse();
});
