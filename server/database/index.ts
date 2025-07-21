import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as wilayah from "./schema/wilayah";
import * as dokumen from "./schema/dokumen";

const config = useRuntimeConfig();

export const db = drizzle({
  connection: {
    url: config.databaseUrl,
    authToken: config.databaseAuthToken,
  },
  schema: {
    ...auth,
    ...wilayah,
    ...dokumen,
  },
  casing: "snake_case",
});
