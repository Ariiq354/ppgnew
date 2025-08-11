import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { desaTable } from "./wilayah";
import { timestamp } from "./common";
import { generusTable } from "./generus";

export const kelasDesaTable = sqliteTable("kelas_desa", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  desaId: int()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  absensi: int({ mode: "boolean" }).notNull().default(false),
  ...timestamp,
});

export const absensiGenerusDesaTable = sqliteTable("absensi_generus_desa", {
  id: int().primaryKey({ autoIncrement: true }),
  kelasId: int()
    .notNull()
    .references(() => kelasDesaTable.id, { onDelete: "cascade" }),
  generusId: int()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...timestamp,
});
