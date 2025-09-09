import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable } from "./wilayah";
import { timestamp } from "./common";
import { generusTable } from "./generus";

export const kelasTahfidzTable = sqliteTable("kelas_tahfidz", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const absensiGenerusTahfidzTable = sqliteTable(
  "absensi_generus_tahfidz",
  {
    id: int().primaryKey({ autoIncrement: true }),
    kelasId: int()
      .notNull()
      .references(() => kelasTahfidzTable.id, { onDelete: "cascade" }),
    generusId: int()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text().notNull(),
    detail: text().notNull().default(""),
    ...timestamp,
  }
);
