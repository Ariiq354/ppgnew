import { OKelasOptionsList } from "~~/server/services/kelas-kelompok/dto/kelas-kelompok.dto";
import { getAllKelasOptions } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasOptionsList.parse(q)
  );

  const data = await getAllKelasOptions(user.kelompokId!, query);

  return HttpResponse(data.data);
});
