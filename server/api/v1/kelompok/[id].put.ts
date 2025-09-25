import { z } from "zod/mini";
import { OKelompokCreate } from "./_dto";
import { updateKelompok } from "~~/server/repository/kelompok.repo";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["manage"] });
  const result = await readValidatedBody(event, (b) =>
    OKelompokCreate.parse(b)
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateKelompok(id, result);

  return HttpResponse();
});
