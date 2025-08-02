import { getOptionsDaerah } from "~~/server/services/daerah/daerah.service";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const data = await getOptionsDaerah();

  return HttpResponse(data.data);
});
