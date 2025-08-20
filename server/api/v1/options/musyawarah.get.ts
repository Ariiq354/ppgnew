import { getAllMusyawarahOptions } from "~~/server/services/musyawarah/musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAllMusyawarahOptions(user.daerahId);

  return HttpResponse(data.data);
});
