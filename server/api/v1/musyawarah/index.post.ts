import { createMusyawarah } from "~~/server/repository/musyawarah/musyawarah.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createMusyawarah(user.daerahId, body);

  return HttpResponse();
});
