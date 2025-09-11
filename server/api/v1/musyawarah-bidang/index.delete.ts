import { deleteMusyawarahBidang } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";
import { ODeleteBidangSchema } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    ODeleteBidangSchema.parse(b)
  );

  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteMusyawarahBidang(user.daerahId, body.bidang, body.id);

  return HttpResponse();
});
