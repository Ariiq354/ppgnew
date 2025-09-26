import { OMusyawarahBidangCreate } from "~~/server/api/v1/musyawarah-bidang/_dto";
import { updateMusyawarahBidangService } from "~~/server/services/musyawarah-bidang/musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahBidangCreate.parse(b)
  );

  await updateMusyawarahBidangService(id, user, body);

  return HttpResponse();
});
