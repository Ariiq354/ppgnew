import { deleteMusyawarahBidangService } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";
import { ODeleteBidang } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteBidang.parse(b));

  await deleteMusyawarahBidangService(user, body);

  return HttpResponse();
});
