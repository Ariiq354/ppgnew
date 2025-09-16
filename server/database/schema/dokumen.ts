import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { daerahTable } from "./wilayah";

export const dokumenTable = pgTable("dokumen", {
  id: serial().primaryKey(),
  name: text().notNull(),
  url: text().notNull(),
  size: integer().notNull(),
  type: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});
