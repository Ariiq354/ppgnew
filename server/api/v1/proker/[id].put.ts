import { z } from "zod/mini";
import { OProkerCreate } from "~~/server/services/proker/dto/proker.dto";
import { updateProker } from "~~/server/services/proker/proker.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => OProkerCreate.parse(b));
  if (user.role !== "admin" && user.role!.split(",")[1] !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await updateProker(parsed, user.daerahId, body);

  return HttpResponse();
});
