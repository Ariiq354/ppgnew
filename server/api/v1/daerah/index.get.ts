import { getAllDaerahService } from "~~/server/modules/daerah";
import { OPagination } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) => OPagination.parse(q));

  const data = await getAllDaerahService(query);

  return HttpResponse(data.data, data.metadata);
});
