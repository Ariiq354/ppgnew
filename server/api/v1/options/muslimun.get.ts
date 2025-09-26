import { getAllMuslimunOptions } from "~~/server/repository/muslimun.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const data = await getAllMuslimunOptions(user.kelompokId!);

  return HttpResponse(data.data);
});
