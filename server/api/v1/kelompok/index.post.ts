import {
  createKelompokService,
  OKelompokCreate,
} from "~~/server/modules/kelompok";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => OKelompokCreate.parse(b));

  await createKelompokService(body);

  return HttpResponse();
});
