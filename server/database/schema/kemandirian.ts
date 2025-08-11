import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable } from "./wilayah";
import { timestamp } from "./common";

export const pengusahaTable = sqliteTable("pengusaha", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  bidangPekerjaan: text().notNull(),
  namaUsaha: text().notNull(),
  noTelepon: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});
