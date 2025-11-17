import { date, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { daerahTable } from "./wilayah";
import { absensiEnum, kelasMudamudiEnum } from "../../../shared/enum";

export const kelasMudaMudiTable = pgTable("kelas_muda_mudi", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text({ enum: kelasMudamudiEnum }).notNull(),
  keterangan: text().notNull().default(""),
  tanggal: date({ mode: "string" }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusMudaMudiTable = pgTable(
  "absensi_generus_muda_mudi",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    kelasId: integer()
      .notNull()
      .references(() => kelasMudaMudiTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_generus_per_kelas_mudamudi").on(
      table.kelasId,
      table.generusId
    ),
  ]
);
