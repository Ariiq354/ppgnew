import { getAllUser } from "~~/server/services/user/user.service";
import { OUserList } from "~~/server/services/user/dto/user.dto";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);
  const query = await getValidatedQuery(event, (query) =>
    OUserList.parse(query)
  );

  const data = await getAllUser(user!.daerahId!, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
