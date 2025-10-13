import { roles } from "~~/shared/permission";
import { checkWilayahNameExistService } from "../daerah";
import { createDaerah } from "../daerah/daerah.repo";
import { getAllUser, updateUserWilayah } from "./user.repo";

export async function getAllUserService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllUser(daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: data.data,
    metadata,
  };
}

export async function updateUserWilayahService(id: number, body: TWilayah) {
  await updateUserWilayah(id, body);
}

export async function createDaerahWithUsersService(daerah: string) {
  const formatted = daerah
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const nama = convertToNameFormat(formatted);

  const exist = await checkWilayahNameExistService(formatted);
  if (exist) throw createError({ statusCode: 400, message: "Nama sudah ada" });

  const [result] = await createDaerah({ name: formatted });

  await auth.api.signUpEmail({
    body: {
      email: `${nama}@gmail.com`,
      name: nama,
      password: nama,
      username: nama,
      daerahId: result!.insertedId,
      displayUsername: nama,
    },
  });

  for (const [index, role] of roles.entries()) {
    const namaPengurus = nama + (index + 1);
    const { user } = await auth.api.signUpEmail({
      body: {
        email: `${namaPengurus}@gmail.com`,
        name: namaPengurus,
        password: namaPengurus,
        username: namaPengurus,
        daerahId: result!.insertedId!,
        displayUsername: namaPengurus,
      },
    });
    (await auth.$context).internalAdapter.updateUser(user.id, { role });
  }

  return { username: nama, password: nama };
}
