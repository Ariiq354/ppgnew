import { getKelas69 } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getKelas69(user.daerahId);

  return HttpResponse(data);
});
