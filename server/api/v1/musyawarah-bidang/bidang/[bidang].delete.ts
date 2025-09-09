import { z } from "zod/mini";
import { deleteMusyawarahBidang } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";
import { roles } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));
  const bidang = getRouterParam(event, "bidang");
  const parsed = z.enum(roles).parse(bidang);

  if (user.role !== "admin" && user.role !== bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteMusyawarahBidang(user.daerahId, parsed, body.id);
  return HttpResponse();
});
