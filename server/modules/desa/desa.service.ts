import { checkWilayahNameExistService } from "../daerah";
import type { TDesaCreate, TDesaList } from "./desa.dto";
import {
  createDesa,
  deleteDesa,
  getAllDesa,
  getCountDesa,
  getDesaByDaerahId,
  getDesaById,
  getOptionsDesa,
  updateDesa,
} from "./desa.repo";

export async function getAllDesaService(query: TDesaList) {
  const data = await getAllDesa(query);

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

export async function getOptionsDesaService(daerahId: number) {
  return await getOptionsDesa(daerahId);
}

export async function getDesaByIdService(id: number) {
  return await getDesaById(id);
}

export async function getDesaByDaerahIdService(daerahId: number) {
  return await getDesaByDaerahId(daerahId);
}

export async function getCountDesaService(daerahId: number) {
  return await getCountDesa(daerahId);
}

export async function createDesaService(body: TDesaCreate) {
  body.name = body.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const nama = convertToNameFormat(body.name);

  const exist = await checkWilayahNameExistService(body.name);
  if (exist) {
    throw createError({
      statusCode: 400,
      message: "Nama sudah ada",
    });
  }

  const [result] = await createDesa({
    name: body.name,
    daerahId: body.daerahId,
  });

  const { user } = await auth.api.signUpEmail({
    body: {
      email: `${nama}@gmail.com`,
      name: nama,
      password: nama,
      username: nama,
      daerahId: body.daerahId,
      desaId: result!.insertedId,
      displayUsername: nama,
    },
  });

  (await auth.$context).internalAdapter.updateUser(user.id, {
    role: "desa",
  });
}

export async function updateDesaService(id: number, body: TDesaCreate) {
  await updateDesa(id, body);
}

export async function deleteDesaService(id: number[]) {
  await deleteDesa(id);
}
