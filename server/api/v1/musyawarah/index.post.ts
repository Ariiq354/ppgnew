import { createMusyawarahService } from "~~/server/modules/musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createMusyawarahService(user.daerahId, body);

  return HttpResponse();
});
