import { daerahTable } from "./wilayah";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const kelasTahfidzTable = pgTable("kelas_tahfidz", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusTahfidzTable = pgTable("absensi_generus_tahfidz", {
  id: serial().primaryKey(),
  kelasId: integer()
    .notNull()
    .references(() => kelasTahfidzTable.id, { onDelete: "cascade" }),
  generusId: integer()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...createdUpdated,
});
