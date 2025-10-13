import { getAllUserService } from "~~/server/modules/user";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OSearchPagination.parse(query)
  );

  const data = await getAllUserService(user!.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
