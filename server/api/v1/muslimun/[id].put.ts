import { updateMuslimunService } from "~~/server/modules/muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateMuslimunService(id, user.kelompokId!, body);

  return HttpResponse();
});
