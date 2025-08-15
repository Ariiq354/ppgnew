import { z } from "zod/mini";
import { deleteProker } from "~~/server/services/proker/proker.service";
import { roles } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["delete"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));
  const bidang = getRouterParam(event, "bidang");
  const parsed = z.enum(roles).parse(bidang);

  if (user.role !== "admin" && user.role!.split(",")[1] !== bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteProker(user.daerahId, parsed, body.id);
  return HttpResponse();
});
