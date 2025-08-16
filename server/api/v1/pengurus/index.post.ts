import { OPengurusCreate } from "~~/server/services/pengurus/dto/pengurus.dto";
import { createPengurus } from "~~/server/services/pengurus/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["create"] });

  const body = await readValidatedBody(event, (b) => OPengurusCreate.parse(b));

  await createPengurus(user.daerahId, body);

  return HttpResponse();
});
