import { getOptionsDaerah } from "~~/server/repository/daerah.repo";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const data = await getOptionsDaerah();

  return HttpResponse(data);
});
