import { createMuslimunService } from "~~/server/modules/muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createMuslimunService(user.kelompokId!, body);

  return HttpResponse();
});
