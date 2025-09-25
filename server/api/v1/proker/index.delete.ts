import { deleteProker } from "~~/server/services/proker/proker.service";
import { ODeleteBidang } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteBidang.parse(b));

  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteProker(user.daerahId, body.bidang, body.id);

  return HttpResponse();
});
