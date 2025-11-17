import { getAllKelasOptionsService } from "~~/server/modules/kelas-kelompok";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasGenerusList.parse(q)
  );

  const data = await getAllKelasOptionsService(user.kelompokId!, query);

  return HttpResponse(data.data);
});
