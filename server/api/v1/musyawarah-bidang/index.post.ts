import { OMusyawarahBidangCreate } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.dto";
import { createMusyawarahBidang } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahBidangCreate.parse(b)
  );
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await createMusyawarahBidang(user.daerahId, body);

  return HttpResponse();
});
