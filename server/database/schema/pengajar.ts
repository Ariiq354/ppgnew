import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { timestamp } from "./common";

export const pengajarTable = sqliteTable("pengajar", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  pendidikan: text().notNull(),
  status: text().notNull(),
  gender: text().notNull(),
  tanggalTugas: text().notNull(),
  noTelepon: text().notNull(),
  foto: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  desaId: int()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  kelompokId: int()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...timestamp,
});
