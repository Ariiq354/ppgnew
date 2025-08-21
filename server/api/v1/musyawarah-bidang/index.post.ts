import { OProkerCreate } from "~~/server/services/proker/dto/proker.dto";
import { createProker } from "~~/server/services/proker/proker.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["manage"] });

  const body = await readValidatedBody(event, (b) => OProkerCreate.parse(b));
  if (user.role !== "admin" && user.role!.split(",")[1] !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await createProker(user.daerahId, body);

  return HttpResponse();
});
