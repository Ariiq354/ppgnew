import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugins, username } from "better-auth/plugins";
import { ac, rolesDeclaration } from "~~/shared/permission";
import { db } from "../database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 1,
  },
  advanced: {
    database: {
      generateId: false,
      useNumberId: true,
    },
  },
  user: {
    modelName: "userTable",
    additionalFields: {
      daerahId: {
        type: "number",
        required: true,
        fieldName: "daerahId",
      },
      desaId: {
        type: "number",
        required: false,
        fieldName: "desaId",
      },
      kelompokId: {
        type: "number",
        required: false,
        fieldName: "kelompokId",
      },
    },
  },
  plugins: [
    username(),
    adminPlugins({
      defaultRole: "user,daerah",
      ac,
      roles: rolesDeclaration,
    }),
  ],
});

export type UserWithId = Omit<typeof auth.$Infer.Session.user, "id"> & {
  id: number;
};
