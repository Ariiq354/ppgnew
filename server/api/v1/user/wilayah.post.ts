import { updateUserWilayah } from "~~/server/repository/user.repo";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);

  const body = await readValidatedBody(event, (b) => OWilayah.parse(b));

  await updateUserWilayah(user.id, body);

  return HttpResponse();
});
