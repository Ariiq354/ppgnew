import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";

export const daerahTable = pgTable(
  "daerah",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: text().notNull().unique(),
    singkatan: text().notNull().unique(),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_singkatan_daerah").on(table.name, table.singkatan),
  ]
);

export const desaTable = pgTable("desa", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: text().notNull().unique(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const kelompokTable = pgTable("kelompok", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: text().notNull().unique(),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});
