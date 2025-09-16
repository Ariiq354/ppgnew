import { daerahTable } from "./wilayah";
import { createdUpdated } from "./common";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const pengusahaTable = pgTable("pengusaha", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  bidangPekerjaan: text().notNull(),
  namaUsaha: text().notNull(),
  noTelepon: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});
