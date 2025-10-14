import {
  OMusyawarahBidangCreate,
  updateMusyawarahBidangService,
} from "~~/server/modules/musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahBidangCreate.parse(b)
  );

  await updateMusyawarahBidangService(id, user, body);

  return HttpResponse();
});
