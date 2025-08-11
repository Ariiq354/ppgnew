import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable } from "./wilayah";
import { timestamp } from "./common";
import { generusTable } from "./generus";

export const kelasMudaMudiTable = sqliteTable("kelas_muda_mudi", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  absensi: int({ mode: "boolean" }).notNull().default(false),
  ...timestamp,
});

export const absensiGenerusMudaMudiTable = sqliteTable(
  "absensi_generus_muda_mudi",
  {
    id: int().primaryKey({ autoIncrement: true }),
    kelasId: int()
      .notNull()
      .references(() => kelasMudaMudiTable.id, { onDelete: "cascade" }),
    generusId: int()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text().notNull(),
    detail: text().notNull().default(""),
    ...timestamp,
  }
);
