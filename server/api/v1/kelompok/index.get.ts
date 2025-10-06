import {
  getAllKelompokService,
  OKelompokList,
} from "~~/server/modules/kelompok";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) => OKelompokList.parse(q));

  const data = await getAllKelompokService(query);

  return HttpResponse(data.data, data.metadata);
});
