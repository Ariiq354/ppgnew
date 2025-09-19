import { updateUserWilayah } from "~~/server/services/user/user.service";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);

  const body = await readValidatedBody(event, (b) => OWilayah.parse(b));

  await updateUserWilayah(user.id, body);

  return HttpResponse();
});
