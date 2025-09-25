import { z } from "zod/mini";
import { OMusyawarahBidangCreate } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.dto";
import { updateMusyawarahBidang } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahBidangCreate.parse(b)
  );
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await updateMusyawarahBidang(parsed, user.daerahId, body);

  return HttpResponse();
});
