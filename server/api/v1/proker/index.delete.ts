import { OProkerDelete } from "~~/server/services/proker/dto/proker.dto";
import { deleteProker } from "~~/server/services/proker/proker.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["delete"] });
  const body = await readValidatedBody(event, (b) => OProkerDelete.parse(b));

  if (user.role !== "admin" && user.role!.split(",")[1] !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteProker(user.daerahId, body.bidang, body.id);
  return HttpResponse();
});
