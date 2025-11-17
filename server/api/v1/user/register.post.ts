import {
  createDaerahWithUsersService,
  ORegister,
} from "~~/server/modules/user";

export default eventHandler(async (event) => {
  const formData = await readValidatedBody(event, (b) => ORegister.parse(b));

  return createDaerahWithUsersService(formData.daerah, formData.singakatan);
});
