import { updateUserWilayahService } from "~~/server/modules/user";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);

  const body = await readValidatedBody(event, (b) => OWilayah.parse(b));

  await updateUserWilayahService(user.id, body);

  return HttpResponse();
});
