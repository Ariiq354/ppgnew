import { date, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { desaTable } from "./wilayah";
import { absensiEnum } from "../../../shared/enum";

export const kelasTahfidzTable = pgTable("kelas_tahfidz", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tanggal: date({ mode: "string" }).notNull(),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusTahfidzTable = pgTable(
  "absensi_generus_tahfidz",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    kelasId: integer()
      .notNull()
      .references(() => kelasTahfidzTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_generus_per_kelas_tahfidz").on(
      table.kelasId,
      table.generusId
    ),
  ]
);
