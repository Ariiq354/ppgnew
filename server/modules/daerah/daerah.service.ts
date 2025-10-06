import { roles } from "~~/shared/permission";
import type { TDaerahCreate } from "./daerah.dto";
import {
  checkWilayahNameExist,
  createDaerah,
  deleteDaerah,
  getAllDaerah,
  getOptionsDaerah,
  updateDaerah,
} from "./daerah.repo";

export async function getAllDaerahService(query: TPagination) {
  const data = await getAllDaerah(query);

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

export async function getOptionsDaerahService() {
  return await getOptionsDaerah();
}

export async function createDaerahService(body: TDaerahCreate) {
  body.name = body.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const nama = convertToNameFormat(body.name);

  const exist = await checkWilayahNameExist(body.name);
  if (exist) {
    throw createError({
      statusCode: 400,
      message: "Nama sudah ada",
    });
  }

  const [result] = await createDaerah({
    name: body.name,
  });

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

  for (const [index, item] of roles.entries()) {
    const namaPengurus = convertToNameFormat(body.name) + (index + 1);
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
    (await auth.$context).internalAdapter.updateUser(user.id, {
      role: item,
    });
  }
}

export async function updateDaerahService(id: number, data: TDaerahCreate) {
  await updateDaerah(id, data);
}

export async function deleteDaerahService(id: number[]) {
  await deleteDaerah(id);
}

export async function checkWilayahNameExistService(name: string) {
  return await checkWilayahNameExist(name);
}
