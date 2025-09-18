import { OKelasCreate } from "~~/server/services/kelas-kelompok/dto/kelas-kelompok.dto";
import { createKelas } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OKelasCreate.parse(b));

  await createKelas(user.kelompokId!, body);

  return HttpResponse();
});
