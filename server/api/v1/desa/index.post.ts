import { checkWilayahNameExist } from "~~/server/services/daerah/daerah.service";
import { createDesa } from "~~/server/services/desa/desa.service";
import { ODesaCreate } from "~~/server/services/desa/dto/desa.dto";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["create"] });

  const body = await readValidatedBody(event, (b) => ODesaCreate.parse(b));

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

  return HttpResponse();
});
