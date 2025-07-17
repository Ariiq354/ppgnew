import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";

const config = useRuntimeConfig();

export const db = drizzle({
  connection: {
    url: config.databaseUrl,
    authToken: config.databaseAuthToken,
  },
  schema: {
    ...auth,
  },
  casing: "snake_case",
});
