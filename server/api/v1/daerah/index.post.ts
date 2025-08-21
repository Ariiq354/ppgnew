import {
  checkWilayahNameExist,
  createDaerah,
} from "~~/server/services/daerah/daerah.service";
import { ODaerahCreate } from "~~/server/services/daerah/dto/daerah.dto";
import { roles } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { daerah: ["manage"] });

  const body = await readValidatedBody(event, (b) => ODaerahCreate.parse(b));

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

  return HttpResponse();
});
