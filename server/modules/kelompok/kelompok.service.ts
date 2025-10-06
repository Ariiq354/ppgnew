import { checkWilayahNameExistService } from "../daerah";
import { getDesaByIdService } from "../desa";
import type { TKelompokCreate } from "./kelompok.dto";
import {
  createKelompok,
  deleteKelompok,
  getAllKelompok,
  getCountKelompok,
  getKelompokByDaerahId,
  getKelompokByDesaId,
  getOptionsKelompok,
  updateKelompok,
} from "./kelompok.repo";

export async function getAllKelompokService(query: TPagination) {
  const data = await getAllKelompok(query);

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

export async function getOptionsKelompokService(desaId: number) {
  return await getOptionsKelompok(desaId);
}

export async function getKelompokByDaerahIdService(daerahId: number) {
  return await getKelompokByDaerahId(daerahId);
}

export async function getKelompokByDesaIdService(desaId: number) {
  return await getKelompokByDesaId(desaId);
}

export async function createKelompokService(body: TKelompokCreate) {
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

  const [result] = await createKelompok({
    name: body.name,
    desaId: body.desaId,
  });

  const desa = await getDesaByIdService(body.desaId);
  if (!desa) {
    throw createError({
      statusCode: 400,
      message: "Desa tidak ada",
    });
  }

  const { user } = await auth.api.signUpEmail({
    body: {
      email: `${nama}@gmail.com`,
      name: nama,
      password: nama,
      username: nama,
      daerahId: desa.daerahId,
      desaId: body.desaId,
      kelompokId: result!.insertedId,
      displayUsername: nama,
    },
  });

  (await auth.$context).internalAdapter.updateUser(user.id, {
    role: "kelompok",
  });
}

export async function updateKelompokService(id: number, data: TKelompokCreate) {
  await updateKelompok(id, data);
}

export async function deleteKelompokService(id: number[]) {
  await deleteKelompok(id);
}

export async function getCountKelompokService(desaId: number) {
  return await getCountKelompok(desaId);
}
