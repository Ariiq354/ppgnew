import { OMusyawarahBidangCreate } from "~~/server/api/v1/musyawarah-bidang/_dto";
import { createMusyawarahBidangService } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahBidangCreate.parse(b)
  );

  await createMusyawarahBidangService(user, body);

  return HttpResponse();
});
