import { getAllMuslimunOptionsService } from "~~/server/modules/muslimun";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAllMuslimunOptionsService(user.kelompokId!);

  return HttpResponse(data.data);
});
