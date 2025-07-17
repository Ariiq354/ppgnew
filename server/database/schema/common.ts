import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/sqlite-core";

export const timestamp = {
  createdAt: int({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
    .notNull(),
};
