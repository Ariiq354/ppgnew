import { getAllMusyawarahOptions } from "~~/server/repository/musyawarah/musyawarah.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAllMusyawarahOptions(user.daerahId);

  return HttpResponse(data.data);
});
