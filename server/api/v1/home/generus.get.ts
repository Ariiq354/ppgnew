import {
  getAllGenerusForDaerahService,
  OGenerusListForDaerah,
} from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) =>
    OGenerusListForDaerah.parse(q)
  );

  const data = await getAllGenerusForDaerahService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
