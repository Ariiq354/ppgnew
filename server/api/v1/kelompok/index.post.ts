import { createKelompok } from "~~/server/services/kelompok/kelompok.service";
import { OKelompokCreate } from "~~/server/services/kelompok/dto/kelompok.dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const body = await getValidatedQuery(event, (b) => OKelompokCreate.parse(b));

  await createKelompok(body);

  return HttpResponse();
});
