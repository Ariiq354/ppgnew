import { createMuslimun } from "~~/server/repository/muslimun.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createMuslimun(user.kelompokId!, body);

  return HttpResponse();
});
