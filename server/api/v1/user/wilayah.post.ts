import { updateUserWilayahService } from "~~/server/modules/user";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { wilayah: ["edit"] });

  const body = await readValidatedBody(event, (b) => OWilayah.parse(b));

  if (user.role === "daerah") {
    body.daerahId = user.daerahId;
  }

  await updateUserWilayahService(user.id, body);

  return HttpResponse();
});
