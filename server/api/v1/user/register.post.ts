import { z } from "zod/mini";
import {
  checkWilayahNameExist,
  createDaerah,
} from "~~/server/repository/daerah.repo";
import { roles } from "~~/shared/permission";

const bodySchema = z.object({
  daerah: z.string(),
});

export default eventHandler(async (event) => {
  const formData = await readValidatedBody(event, (b) => bodySchema.parse(b));

  formData.daerah = formData.daerah
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const nama = convertToNameFormat(formData.daerah);

  const exist = await checkWilayahNameExist(formData.daerah);
  if (exist) {
    throw createError({
      statusCode: 400,
      message: "Nama sudah ada",
    });
  }

  const [result] = await createDaerah({
    name: formData.daerah,
  });

  try {
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
  } catch (error) {
    console.error(error);
    throw InternalError;
  }

  for (const [index, item] of roles.entries()) {
    const namaPengurus = convertToNameFormat(formData.daerah) + (index + 1);
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

  return {
    username: nama,
    password: nama,
  };
});
