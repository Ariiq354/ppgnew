import { z } from "zod/mini";
import { updateKelompok } from "~~/server/services/kelompok/kelompok.service";
import { OKelompokCreate } from "~~/server/services/kelompok/dto/kelompok.dto";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["update"] });
  const result = await readValidatedBody(event, (b) =>
    OKelompokCreate.parse(b)
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateKelompok(id, result);

  return HttpResponse();
});
