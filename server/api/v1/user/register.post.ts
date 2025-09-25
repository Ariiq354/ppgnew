import { createDaerahWithUsersService } from "~~/server/services/user.service";
import { ORegister } from "./_dto";

export default eventHandler(async (event) => {
  const formData = await readValidatedBody(event, (b) => ORegister.parse(b));

  return createDaerahWithUsersService(formData.daerah);
});
