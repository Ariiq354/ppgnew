import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as wilayah from "./schema/wilayah";
import * as dokumen from "./schema/dokumen";
import Env from "../../shared/env";

export const db = drizzle({
  connection: {
    url: Env.DATABASE_URL,
    authToken: Env.DATABASE_AUTH_TOKEN,
  },
  schema: {
    ...auth,
    ...wilayah,
    ...dokumen,
  },
  casing: "snake_case",
});
