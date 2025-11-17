import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { daerahTable } from "./wilayah";

export const pengusahaTable = pgTable("pengusaha", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  bidangPekerjaan: text().notNull(),
  namaUsaha: text().notNull(),
  noTelepon: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});
