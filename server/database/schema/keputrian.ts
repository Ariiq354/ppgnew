import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable } from "./wilayah";
import { timestamp } from "./common";
import { generusTable } from "./generus";

export const kelasKeputrianTable = sqliteTable("kelas_keputrian", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const absensiGenerusKeputrianTable = sqliteTable(
  "absensi_generus_keputrian",
  {
    id: int().primaryKey({ autoIncrement: true }),
    kelasId: int()
      .notNull()
      .references(() => kelasKeputrianTable.id, { onDelete: "cascade" }),
    generusId: int()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text().notNull(),
    detail: text().notNull().default(""),
    ...timestamp,
  }
);
