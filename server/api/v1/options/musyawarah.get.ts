import { getAllMusyawarahOptionsService } from "~~/server/modules/musyawarah";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAllMusyawarahOptionsService(user.daerahId);

  return HttpResponse(data.data);
});
