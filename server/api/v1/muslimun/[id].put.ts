import { updateMuslimun } from "~~/server/repository/muslimun.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateMuslimun(id, user.kelompokId!, body);

  return HttpResponse();
});
