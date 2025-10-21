import { getDashboard } from "~~/server/modules/dashboard";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getDashboard(user.daerahId);

  return HttpResponse(data);
});
