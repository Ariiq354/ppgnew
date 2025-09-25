import {
  checkWilayahNameExist,
  createDaerah,
} from "~~/server/repository/daerah.repo";
import { roles } from "~~/shared/permission";

export async function createDaerahWithUsersService(daerah: string) {
  const formatted = daerah
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const nama = convertToNameFormat(formatted);

  const exist = await checkWilayahNameExist(formatted);
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
