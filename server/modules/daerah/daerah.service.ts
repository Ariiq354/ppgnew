import { bidangEnum } from "~~/shared/enum";
import type { TDaerahCreate } from "./daerah.dto";
import {
  checkSingkatanExist,
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
  const { name, singkatan } = body;

  const formatted = name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const exist = await checkWilayahNameExistService(formatted);
  const singkatanExist = await checkSingkatanExistService(singkatan);
  if (exist) throw createError({ statusCode: 400, message: "Nama sudah ada" });
  if (singkatanExist)
    throw createError({ statusCode: 400, message: "Singkatan sudah ada" });

  const [result] = await createDaerah({ name: formatted, singkatan });
  const nama = `admin.${singkatan}`;

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

  for (const role of bidangEnum) {
    const namaPengurus = `${role}.${singkatan}`;
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

export async function checkSingkatanExistService(singkatan: string) {
  return await checkSingkatanExist(singkatan);
}
