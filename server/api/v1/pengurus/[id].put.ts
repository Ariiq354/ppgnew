import { z } from "zod/mini";
import { updatePengurus } from "~~/server/services/pengurus/pengurus.service";
import { OPengurusCreate } from "~~/server/services/pengurus/dto/pengurus.dto";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["update"] });
  const result = await readValidatedBody(event, (b) =>
    OPengurusCreate.parse(b)
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updatePengurus(id, user.daerahId, result);

  return HttpResponse();
});
