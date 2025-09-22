import { getAllMuslimunOptions } from "~~/server/services/muslimun/muslimun.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAllMuslimunOptions(user.kelompokId!);

  return HttpResponse(data.data);
});
