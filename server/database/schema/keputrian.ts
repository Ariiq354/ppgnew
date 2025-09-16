import { daerahTable } from "./wilayah";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const kelasKeputrianTable = pgTable("kelas_keputrian", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusKeputrianTable = pgTable(
  "absensi_generus_keputrian",
  {
    id: serial().primaryKey(),
    kelasId: integer()
      .notNull()
      .references(() => kelasKeputrianTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text().notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  }
);
