import {
  createKelompokService,
  OKelompokCreate,
} from "~~/server/modules/kelompok";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OKelompokCreate.parse(b));

  await createKelompokService(body);

  return HttpResponse();
});
