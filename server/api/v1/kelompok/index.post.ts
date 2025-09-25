import { checkWilayahNameExist } from "~~/server/repository/daerah.repo";
import { getDesaById } from "~~/server/repository/desa.repo";
import { OKelompokCreate } from "./_dto";
import { createKelompok } from "~~/server/repository/kelompok.repo";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OKelompokCreate.parse(b));

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

  const [result] = await createKelompok({
    name: body.name,
    desaId: body.desaId,
  });

  const desa = await getDesaById(body.desaId);
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

  return HttpResponse();
});
