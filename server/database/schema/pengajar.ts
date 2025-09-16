import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { createdUpdated } from "./common";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const pengajarTable = pgTable("pengajar", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  pendidikan: text().notNull(),
  status: text().notNull(),
  gender: text().notNull(),
  tanggalTugas: text().notNull(),
  noTelepon: text().notNull(),
  foto: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...createdUpdated,
});
