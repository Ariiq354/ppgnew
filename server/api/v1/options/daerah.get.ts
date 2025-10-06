import { getOptionsDaerahService } from "~~/server/modules/daerah";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const data = await getOptionsDaerahService();

  return HttpResponse(data);
});
