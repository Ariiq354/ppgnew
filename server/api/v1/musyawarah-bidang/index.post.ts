import {
  createMusyawarahBidangService,
  OMusyawarahBidangCreate,
} from "~~/server/modules/musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahBidangCreate.parse(b)
  );

  await createMusyawarahBidangService(user, body);

  return HttpResponse();
});
